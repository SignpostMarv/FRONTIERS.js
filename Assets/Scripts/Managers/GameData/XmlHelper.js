import filterOutRootNode from '../../../../Utilities/filterOutRootNode.js';

export default (function(){
  'use strict';

  var
    filterOutUnsupportedNodes = function(jxon, unsupported=[]){
      return new Promise(function(resolve, reject){
        if(!unsupported || unsupported.length < 0){
          console.log('unsupported is empty', jxon);
          resolve(jxon);
          return;
        }
        for(var nodeName of Object.keys(jxon)){
          if(
            unsupported.indexOf(nodeName) >= 0 &&
            typeof(jxon[nodeName]) === 'string' &&
            jxon[nodeName] !== ''
          ){
            console.error('unsupported thing', jxon, nodeName);
            reject(new Error(nodeName + ' is not presently supported!'));
            return;
          }
        }
        resolve(jxon);
      });
    },
    applyFromJXON = function(jxon, typeInstance, expectingFromJxon){
      return new Promise(function(resolve, reject){
        var
          expectingFromJxonKeys = Object.keys(expectingFromJxon),
          jxonFromJxonKeys = Object.keys(jxon).filter(function(jxonKey){
            return expectingFromJxonKeys.indexOf(jxonKey) >= 0;
          }),
          i = 0|0
        ;
        if(expectingFromJxonKeys.length === 0){
          //console.warn('skipping', typeInstance);
          resolve(typeInstance);
          return;
        }else if(
          jxonFromJxonKeys.length !== expectingFromJxonKeys.length
        ){
          var
            missing = []
          ;
          for(var expected of expectingFromJxonKeys){
            if(jxonFromJxonKeys.indexOf(expected) < 0){
              missing.push(expected);
            }
          }
          console.error(
            'missing stuff',
            missing,
            jxonFromJxonKeys,
            expectingFromJxonKeys,
            jxon
          );
          reject(new Error(
            'Some expected derialisable objects were not found: ' +
            missing.join(', ')
          ));
          return;
        }
        Promise.all(jxonFromJxonKeys.map(function(jxonKey){
          if(typeof(expectingFromJxon[jxonKey].FromJXON) !== 'function'){
            reject(['unsupported FromJXON!', jxonKey, jxon, expectingFromJxon]);
            return;
          }
          return expectingFromJxon[jxonKey].FromJXON(jxon[jxonKey]);
        })).then(function(values){
          for(i=0;i<jxonFromJxonKeys.length;++i){
            typeInstance[jxonFromJxonKeys[i]] = values[i];
          }
          resolve(typeInstance);
        }, reject);
      });
    },
    applyFromPrimitives = function(jxon, typeInstance, expectingPrimitives=[]){
      return new Promise(function(resolve, reject){
        if(expectingPrimitives.length === 0){
          resolve(typeInstance);
          return;
        }
        var
          jxonKeys = Object.keys(jxon)
        ;
        for(var expected of expectingPrimitives){
          if(jxonKeys.indexOf(expected) < 0){
            reject(new Error(expected + ' was not found on jxon object!'));
            return;
          }
          typeInstance[expected] = jxon[expected];
        }
        resolve(typeInstance);
      });
    },
/*
    applyFromJXONArray = function(jxon, typeInstance, expectingFromJxonAray){
      return new Promise(function(resolve, reject){
        if(
          !expectingFromJxonAray ||
          expectingFromJxonAray.length === 0
        ){
          resolve(typeInstance);
          return;
        }
        console.log('calling applyFromJXONArray', jxon, expectingFromJxonAray);
        Promise.all(Object.keys(expectingFromJxonAray).map(function(arrayProp){
          return new Promise(function(res, rej){
            if(jxon[arrayProp] instanceof Array){
              Promise.all(jxon[arrayProp].map(function(arrayedJxon){
                console.log(
                  'setting up',
                  jxon[arrayProp][arrayedJxon],
                  expectingFromJxonAray[arrayProp]
                );
                return expectingFromJxonAray[arrayProp].FromJXON(
                  jxon[arrayProp][arrayedJxon]
                );
              })).then(function(values){
                console.log('zomg wtf', arrayProp, values);
              }, function(failure){
                console.error('failure for', arrayProp, failure);
                rej(failure);
              });
            }else{
              var
                jxonArrayPropKeys = Object.keys(jxon[arrayProp])
              ;
              Promise.all(jxonArrayPropKeys.map(function(arrayedJxon){
                return expectingFromJxonAray[arrayProp].FromJXON(
                  jxon[arrayProp][arrayedJxon]
                );
              })).then(function(values){
                var
                  i = 0|0
                ;
                for(i=0;i<values.length;++i){
                  typeInstance[jxonArrayPropKeys[i]] = values[i];
                }
                res(typeInstance);
              }, rej);
            }
          });
        })).then(function(){
          resolve(typeInstance);
        }).catch(reject);
      });
    }
*/
    applyFromJXONArray = function(jxon, typeInstance, spec){
      return new Promise(function(resolve){
        if(!spec){
          resolve(typeInstance);
          return;
        }
        var
          specKeys = Object.keys(spec)
        ;
        Promise.all(specKeys.map(function(jxonProp){
          return new Promise(function(subRes, subRej){
            var
              propKeys = Object.keys(jxon[jxonProp])
            ;
            if(
              propKeys.length === 1 &&
              spec[jxonProp].name === propKeys[0]
            ){
              Promise.all(jxon[jxonProp][propKeys[0]].map(function(subJxon){
                return spec[jxonProp].FromJXON(subJxon);
              })).then(subRes, subRej);
            }else{
              subRej([
                'unsupported stuff',
                propKeys,
                spec[jxonProp].name,
                spec[jxonProp].name === propKeys[0],
                jxonProp,
                jxon[jxonProp],
              ]);
            }
          });
        })).then(function(values){
          specKeys.forEach(function(specKey, i){
            typeInstance[specKey] = values[i];
          });
          resolve(typeInstance);
        });
      });
    }
  ;

  class XmlHelper{

    static XML2JXON(xmlstring){
      return new Promise(function(resolve, reject){
        try{
          JXON.config({
            lowerCaseTags: false,
            trueIsEmpty: false,
            autoDate: false,
          });
          resolve(JXON.stringToJs(xmlstring));
        }catch(failure){
          reject(failure);
        }
      });
    }

    static Url2JXON(url){
      return new Promise(function(resolve, reject){
        fetch(url).then(function(response){
          response.clone().text().then(
            XmlHelper.XML2JXON
          ).then(resolve).catch(reject);
        }, reject);
      });
    }

    static JXON2Type(
      jxon,
      rootNode,
      TypeInstanceType,
      expectingPrimitives=[],
      expectingFromJxon={},
      unsupported=[],
      expectingFromJxonAray=false
    ){
      return new Promise(function(resolve){
        var
          handleParsing = function(jxon){
            return new Promise(function(res){
              var
                typeInstance = new TypeInstanceType()
              ;
              Promise.all([
                applyFromJXON(jxon, typeInstance, expectingFromJxon),
                applyFromJXONArray(jxon, typeInstance, expectingFromJxonAray),
                applyFromPrimitives(jxon, typeInstance, expectingPrimitives),
              ]).then(function(){
                res(typeInstance);
              });
            });
          }
        ;
        filterOutRootNode(
          jxon,
          rootNode
        ).then(
          function(jxon){
            filterOutUnsupportedNodes(jxon, unsupported).then(
              handleParsing
            ).then(resolve);
          }
        );
      });
    }
  }

  return XmlHelper;
})();
