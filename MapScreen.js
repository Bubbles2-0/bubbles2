import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, Button, TextInput, Text } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {region && (
        <MapView style={styles.map} initialRegion={region} onPress={() => setModalVisible(true)} />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Information</Text>
            <TextInput style={styles.modalTextInput} placeholder="Info 1" />
            <TextInput style={styles.modalTextInput} placeholder="Info 2" />
            <TextInput style={styles.modalTextInput} placeholder="Info 3" />
            <Button onPress={() => setModalVisible(!modalVisible)} title="Hide Modal" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});


  