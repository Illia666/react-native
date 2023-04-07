import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const [props, setProps] = useState(null);

  useEffect(() => {
    if (route.params) {
      setProps(route.params);
    }
  }, [route.params]);

  return (
    <>
      {props && (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: props.loc.latitude,
              longitude: props.loc.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: props.loc.latitude,
                longitude: props.loc.longitude,
              }}
              title={props.name}
            />
          </MapView>
        </View>
      )}
    </>
  );
};
export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
