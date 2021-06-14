import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,

  Image,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class transactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal',
    };
  }

  getCammeraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermissions: status === 'granted',
      buttonState: 'clicked',
      scanned: false,
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal',
    });
  };
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === 'clicked' && hasCameraPermissions) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    } else if (buttonState === 'normal') {
      return (
       
          <View style={styles.container}>
            
            <Image
              style={styles.imageIcon}
              source={{
                uri:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg',
              }}
            />
          

          <Text style={styles.displayText}>
            {hasCameraPermissions === true ? (
              <Text
                style={styles.Button}
                onPress={() => Linking.openURL(this.state.scannedData)}>
                {this.state.scannedData}
              </Text>
            ) : (
              ''
            )}
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCammeraPermissions}>
            <Text style={styles.text}>SCAN QR CODE (OR) BARCODE</Text>
          </TouchableOpacity>
        </View>
        
      );
    }
  }
}
const styles = StyleSheet.create({
  scanButton: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderColor: 'orange',
    borderWidth: 5,
  },
  Button: {
    backgroundColor: 'orange',
    padding: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  displayText: {
    fontSize: 15,
    textDecerationLine: 'underline',
  },
  text: {
    fontSize: 18,
    fontWeight:'bold',
  },
  imageIcon: {
    width: 150,
    height: 150,
  },
});
