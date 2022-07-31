# 🗺️itinerary

> Itinerary component

## Install me first :

- nodejs :
`npm install -s itinerary`
- github: `git clone git@github.com:libetl/itinerary.git`

## Storybook :

https://libetl.github.io/itinerary

## How to integrate

### From scratch with only a browser and nothing else :

1. Open this URL (you can inline html in a browser)
```html
data:text/html,<html>
  <head>
    <meta charset="UTF-8"/>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript">
      itinerary.display(document.getElementById('root'), 
      {items:[
        {productType:'GROUND', 
         segments:[
           {start:{date:{day:20, month:3, year:2019 },time:{hour:0, minutes:0}},
            supplier: { name: 'London one day travel card' }
           }]}]})
    </script>
  </body>
</html>
```

### From scratch :

1. mkdir project
2. cd project
3. `npm init`
4. `npm install -s itinerary`
5. add the following html file
```html
<html>
  <head>
    <meta charset="UTF-8"/>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/javascript">
      var options = {/* your options */}
      ReactDOM.createRoot(document.getElementById("root")).render(
        React.createElement(Itinerary, options));
    </script>
  </body>
</html>
```
6. change the options object
7. open the browser

### From a webapp not using react

1. `npm install -s itinerary`
2. in the rendering templates : `<div id="root"></div>`
3. if necessary (CommonJs) : `const { Itinerary } = require('itinerary')`<br/>
   or `import { display as displayItinerary } from 'itinerary'`
4. in the controller code : `displayItinerary(document.getElementById('root'), options)`

### From checkout-webapp
1. Go to the javascript REPL in any checkout (maui, prod) and type this :
```javascript
ReactDOM.createRoot(document.getElementById("cartReview")).render(
        React.createElement(Itinerary,{resizeInFontSize: true, "items": [{
    		"fareAndSalesConditions": {
    			"text": "This trip item cannot be canceled beforee nor after ticketing. Only refundable in case of strikes or weather conditions strongly impacting the trafic",
    			"title": "Fare and Sales conditions"
    		},
    		"segments": [{
    			"destination": {
    				"cityName": "Amsterdam",
    				"code": "AMS",
    				"coordinates": {
    					"latitude": 4.76389,
    					"longitude": 52.308601
    				},
    				"name": "Schipol"
    			},
    			"end": {
    				"date": {
    					"day": 28,
    					"month": 3,
    					"year": 2020
    				},
    				"time": {
    					"hour": 9,
    					"minutes": 40
    				},
    				"timezone": "+01:00"
    			},
    			"origin": {
    				"cityName": "Paris",
    				"code": "CDG",
    				"coordinates": {
    					"latitude": 2.55,
    					"longitude": 49.012798
    				},
    				"name": "Roissy-Charles de Gaulle"
    			},
    			"start": {
    				"date": {
    					"day": 28,
    					"month": 3,
    					"year": 2020
    				},
    				"time": {
    					"hour": 8,
    					"minutes": 15
    				},
    				"timezone": "+01:00"
    			},
    			"supplier": {
    				"amenities": [{
    					"icon": "wifi",
    					"text": "Free Wifi"
    				}, {
    					"icon": "plug",
    					"text": "USB plugs and 220V European compliant plugs"
    				}, {
    					"icon": "tablet",
    					"text": "Videos and games on board"
    				}, {
    					"icon": "dining",
    					"text": "Fresh meals and continental cuisine"
    				}],
    				"cabinClass": "Economy",
    				"classCode": "ECONOMY",
    				"code": "kl",
    				"name": "KLM",
    				"operatingCompany": "Air France",
    				"vehicle": "Airbus A320",
    				"vendorTransitNumber": 2008
    			}
    		}, {
    			"destination": {
    				"cityName": "Amsterdam",
    				"code": "AMS",
    				"coordinates": {
    					"latitude": 2.55,
    					"longitude": 49.012798
    				},
    				"name": "Schipol"
    			},
    			"end": {
    				"date": {
    					"day": 28,
    					"month": 3,
    					"year": 2020
    				},
    				"time": {
    					"hour": 11,
    					"minutes": 0
    				},
    				"timezone": "+01:00"
    			},
    			"start": {
    				"date": {
    					"day": 28,
    					"month": 3,
    					"year": 2020
    				},
    				"time": {
    					"hour": 9,
    					"minutes": 40
    				},
    				"timezone": "+01:00"
    			}
    		}, {
    			"destination": {
    				"cityName": "Taipei",
    				"code": "TPE",
    				"coordinates": {
    					"latitude": 121.233002,
    					"longitude": 25.0777
    				},
    				"name": "Taiwan-Taoyuan Airport"
    			},
    			"end": {
    				"date": {
    					"day": 29,
    					"month": 3,
    					"year": 2020
    				},
    				"time": {
    					"hour": 6,
    					"minutes": 35
    				},
    				"timezone": "+08:00"
    			},
    			"origin": {
    				"cityName": "Amsterdam",
    				"code": "AMS",
    				"coordinates": {
    					"latitude": 2.55,
    					"longitude": 49.012798
    				},
    				"name": "Schipol"
    			},
    			"start": {
    				"date": {
    					"day": 28,
    					"month": 3,
    					"year": 2020
    				},
    				"time": {
    					"hour": 11,
    					"minutes": 0
    				},
    				"timezone": "+01:00"
    			},
    			"supplier": {
    				"amenities": [{
    					"icon": "wifi",
    					"text": "Free Wifi"
    				}, {
    					"icon": "plug",
    					"text": "USB plugs and 220V European compliant plugs"
    				}, {
    					"icon": "tablet",
    					"text": "Videos and games on board"
    				}, {
    					"icon": "dining",
    					"text": "Fresh meals and continental cuisine"
    				}],
    				"cabinClass": "Economy",
    				"classCode": "ECONOMY",
    				"code": "mu",
    				"name": "China Airlines",
    				"operatingCompany": "Air France",
    				"vehicle": "Airbus A350-900",
    				"vendorTransitNumber": 9292
    			}
    		}, {
    			"destination": {
    				"cityName": "Taipei",
    				"code": "TPE",
    				"coordinates": {
    					"latitude": 121.233002,
    					"longitude": 25.0777
    				},
    				"name": "Taiwan-Taoyuan Airport"
    			},
    			"end": {
    				"date": {
    					"day": 29,
    					"month": 3,
    					"year": 2020
    				},
    				"time": {
    					"hour": 8,
    					"minutes": 50
    				}
    			},
    			"start": {
    				"date": {
    					"day": 29,
    					"month": 3,
    					"year": 2020
    				},
    				"time": {
    					"hour": 6,
    					"minutes": 35
    				}
    			}
    		}, {
    			"destination": {
    				"cityName": "Tokyo",
    				"code": "NRT",
    				"coordinates": {
    					"latitude": 140.386001587,
    					"longitude": 35.7647018433
    				},
    				"name": "Narita Airport"
    			},
    			"end": {
    				"date": {
    					"day": 29,
    					"month": 3,
    					"year": 2020
    				},
    				"time": {
    					"hour": 13,
    					"minutes": 15
    				},
    				"timezone": "+09:00"
    			},
    			"origin": {
    				"cityName": "Taipei",
    				"code": "TPE",
    				"coordinates": {
    					"latitude": 121.233002,
    					"longitude": 25.0777
    				},
    				"name": "Taiwan-Taoyuan Airport"
    			},
    			"start": {
    				"date": {
    					"day": 29,
    					"month": 3,
    					"year": 2020
    				},
    				"time": {
    					"hour": 8,
    					"minutes": 50
    				},
    				"timezone": "+08:00"
    			},
    			"supplier": {
    				"amenities": [{
    					"icon": "wifi",
    					"text": "Free Wifi"
    				}, {
    					"icon": "plug",
    					"text": "USB plugs and 220V European compliant plugs"
    				}, {
    					"icon": "tablet",
    					"text": "Videos and games on board"
    				}, {
    					"icon": "dining",
    					"text": "Fresh meals and continental cuisine"
    				}],
    				"cabinClass": "Economy",
    				"classCode": "ECONOMY",
    				"code": "mu",
    				"name": "China Airlines",
    				"vehicle": "Airbus A350-900",
    				"vendorTransitNumber": 100
    			}
    		}],
    		"specificities": [{
    			"icon": "non-refundable",
    			"text": "Non refundable"
    		}],
    		"travelers": [{
    			"firstName": "Pamela",
    			"lastName": "Olivia Gil"
    		}, {
    			"firstName": "Michael",
    			"lastName": "Kael"
    		}],
    		"tripType": "ONE_WAY",
    		"productType": "FLIGHT"
    	}, {
    		"checkinInstruction": {
    			"text": "Additional fees apply to children 0-9 years\n        old for breakfast included rate plans. Fore more details, please contact the\n        property using the information one the reservation confirmation received\n        after booking."
    		},
    		"fareAndSalesConditions": {
    			"text": "This trip item cannot be canceled beforee nor after ticketing. Only refundable in case of strikes or weather conditions strongly impacting the trafic",
    			"title": "Total due at day of checkin"
    		},
    		"segments": [{
    			"destination": {
    				"address": "2 Chome-10-3 Nagatacho, Chiyoda City, Tokyo 100-0014, Japan",
    				"cityName": "Tokyo"
    			},
    			"end": {
    				"date": {
    					"day": 5,
    					"month": 4,
    					"year": 2020
    				},
    				"time": {
    					"hour": 10,
    					"minutes": 0
    				}
    			},
    			"start": {
    				"date": {
    					"day": 29,
    					"month": 3,
    					"year": 2020
    				},
    				"time": {
    					"hour": 17,
    					"minutes": 0
    				}
    			},
    			"supplier": {
    				"name": "The Capitol Hotel Tokyo"
    			}
    		}],
    		"specificity": [{
    			"icon": "non-refundable",
    			"text": "Non refundable"
    		}, {
    			"icon": "receipt",
    			"text": "Receipt printed by hotel"
    		}, {
    			"icon": "time",
    			"text": "Late reception possible"
    		}],
    		"travelers": [{
    			"firstName": "Pamela",
    			"lastName": "Olivia Gil"
    		}, {
    			"firstName": "Michael",
    			"lastName": "Kael"
    		}],
    		"productType": "HOTEL"
    	}], "googleMapsApiKey":"<API_KEY>"}))
```

## How to contribute, maintain

1. `npm install`
2. `npm run build`


## Need some help ?

* In this storybook, look at the left panel, choose the section that you want to visit.
* Also have a look at the addons :
  - JSX displays the snippet of code able to reproduce the use case

