import { ELGIN_MAP_GEOMETRY_TYPE, PERMIT_GEOMETRY_TYPE } from 'src/app/constants/app-repo.constants';
import { ElginMapDataModel } from './elginmap-model';
declare const GT_OSGB: any;
declare const GT_WGS84: any;

export class ElginMapUtility {
    static addDrawingManger(dataModel: ElginMapDataModel) {
        const drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: dataModel.drawingManager.drawingMode,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_LEFT,
                drawingModes: [
                    google.maps.drawing.OverlayType.MARKER,
                    // google.maps.drawing.OverlayType.CIRCLE,
                    google.maps.drawing.OverlayType.POLYGON,
                    google.maps.drawing.OverlayType.POLYLINE,
                    // google.maps.drawing.OverlayType.RECTANGLE,
                ],
            },
            circleOptions: {
                editable: true
            },
            polygonOptions: {
                editable: true
            }
        });
        drawingManager.setMap((<any>window).Elgin.map);
        return drawingManager;
    }

    static addDrawingListener(drawingManager) {
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
            if (event.type == 'polygon') {
                let path = event.overlay.getPath();
                if (path) {
                    ElginMapUtility.getPolygonCoordinates(path)
                }
            }
        });
    }

    // TODO: to be updated further
    static getPolygonCoordinates(path: any) {
        if (path && path.i) {
            alert(JSON.stringify(path))
            path.i.forEach(element => {
                console.log('lat->', element.lat())
                console.log('lng->', element.lng())
            });
        }
    }

    // TODO: to be updated further
    static addPolygons() {
        const map = (<any>window).Elgin.map;
        map.setZoom(14);
        map.setCenter({ lat: 53.78468, lng: -1.58233 })
        const blueCoords = [
            { lat: 53.78468, lng: -1.58233 },
            { lat: 53.78658, lng: -1.58344 },
            { lat: 53.78868, lng: -1.58255 },
        ];
        const redCoords = [
            {
                "lat": 53.792519865111586,
                "lng": -1.5692412217101737
            },
            {
                "lat": 53.77933549902776,
                "lng": -1.573704417510955
            },
            {
                "lat": 53.7769010091516,
                "lng": -1.54761188821408
            }
        ];
        // Construct a draggable red triangle with geodesic set to true.
        new google.maps.Polygon({
            map,
            paths: redCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            draggable: true,
            geodesic: true,
        });
        // Construct a draggable blue triangle with geodesic set to false.
        new google.maps.Polygon({
            map,
            paths: blueCoords,
            strokeColor: "#FFAF00",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF00F0",//"#0000FF",
            fillOpacity: 0.35,
            draggable: true,
            geodesic: false,
        });
    }

    static addPolygon(data: any) {
        const map = (<any>window).Elgin.map;
        // Construct a draggable red triangle with geodesic set to true.
        return new google.maps.Polygon({
            map,
            paths: data.coordinates,
            fillColor: "#adaeaf",
            editable: data.editable
        });
    }

    static addPolyline(data: any) {
        const map = (<any>window).Elgin.map;
        // Construct a draggable red triangle with geodesic set to true.
        return new google.maps.Polyline({
            map,
            path: data.coordinates
        });
    }

    static addMarker(data: any) {
      const map = (<any>window).Elgin.map;
      // Construct a draggable red triangle with geodesic set to true.
      return new google.maps.Marker({
          map,
          position: data.coordinates
      });
  }

    // { lat: 53.78468, lng: -1.58233 }
    static setCenter(center, zoom) {
        const map = (<any>window).Elgin.map;
        let newZoom = zoom ? zoom : 18;
        map.setZoom(newZoom);
        map.setCenter(center);
    }

    static convertToLatLong(lat: any, lang: any) {
        let osgb = new GT_OSGB();
        osgb.setGridCoordinates(lat, lang);
        //convert to a wgs84 coordinate
        let wgs84 = osgb.getWGS84();
        return { lat: wgs84.latitude, lng: wgs84.longitude };
    }

    static convertCoordinatesToLatLong(cordinateNorthingsEastings: any) {
        let coordinatesLatLongs: any[] = [];
        let coordinates = cordinateNorthingsEastings ? cordinateNorthingsEastings[0] : null;
        if (coordinates) {
            for (let i = 0; i < coordinates.length; i++) {
                let coordinatesLatLong = ElginMapUtility.convertToLatLong(
                    coordinates[i][0], coordinates[i][1])
                coordinatesLatLongs.push(coordinatesLatLong);
            }
        }
        return coordinatesLatLongs;
    }

    static convertCoordinatesToLatLongForPloyline(cordinateNorthingsEastings: any) {
        let coordinatesLatLongs: any[] = [];
        let coordinates = cordinateNorthingsEastings ? cordinateNorthingsEastings : null;
        if (coordinates) {
            for (let i = 0; i < coordinates.length; i++) {
                let coordinatesLatLong = ElginMapUtility.convertToLatLong(
                    coordinates[i][0], coordinates[i][1])
                coordinatesLatLongs.push(coordinatesLatLong);
            }
        }
        return coordinatesLatLongs;
    }

    static convertCoordinatesToLatLongForMarker(cordinateNorthingsEastings: any) {
      let coordinatesLatLongs: any[] = [];
      let coordinates = cordinateNorthingsEastings;
      if (coordinates) {

              let coordinatesLatLong = ElginMapUtility.convertToLatLong(
                cordinateNorthingsEastings[0],
                cordinateNorthingsEastings[1]
              )
              coordinatesLatLongs.push(coordinatesLatLong.lat);
              coordinatesLatLongs.push(coordinatesLatLong.lng);

      }
      return coordinatesLatLongs;
  }

    static convertLatLngToEastingsNorthings(lat: any, lng: any) {
        let wgs84 = new GT_WGS84();
        wgs84.setDegrees(lat, lng);//(<Lattitude>,<Longitude>)
        let osgb = wgs84.getOSGB();//osgb.eastings, osgb.northings
        //console.log('---------osgb-------', element.lat(), element.lng(), osgb)
        return osgb
    }

    static getGeometryType(type: any) {
        switch (type) {
            case "Polygon":
                return ELGIN_MAP_GEOMETRY_TYPE.POLYGON;
                case "Point":
                  return ELGIN_MAP_GEOMETRY_TYPE.MARKER;
                case "LineString":
                  return ELGIN_MAP_GEOMETRY_TYPE.POLYLINE;
            default:
                null
        }
    }

    static getGeometryTypeForRequest(type: any) {
        switch (type) {
            case "polygon":
                return PERMIT_GEOMETRY_TYPE.POLYGON;
            case "marker":
                return PERMIT_GEOMETRY_TYPE.MARKER;
            case "polyline":
                return PERMIT_GEOMETRY_TYPE.POLYLINE;
            default:
                null
        }
    }

}
