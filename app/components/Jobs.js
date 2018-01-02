import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Receipts from '../components/Receipts';

class Jobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      jobs: [],
      receipts: [],
      viewReceipts: false,
    };
  }
  static navigationOptions = {
    title: 'Welcome',
  };

  async _getJobs() {
    let id = await AsyncStorage.getItem('userId');
    fetch('https://spring-clock.herokuapp.com/rest/jobs/assigned/employee/' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2, r3, r4, r5, r6) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
          receipts: [],
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _getReceipts(jobId) {
    var rec = [];
    fetch('https://spring-clock.herokuapp.com/rest/jobs/' + jobId + '/material')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(jobId);
        console.log(responseJson);
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2, r3, r4, r5, r6) => r1 !== r2 });
        this.setState({
          isLoading: false,
          receipts: ds.cloneWithRows(responseJson),
        });
        console.log("state " + this.state.receipts);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    this._getJobs();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>

        </View>
      );
    }
    if (this.state.receipts.length < 1) {
      return (
        <View style={styles.listStyle}>
          <Text style={styles.userStyle} >
            {"Today's Job Site"}
          </Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <TouchableOpacity
                style={styles.changeId}
                onPress={
                  () => this._getReceipts(rowData.id)
                }
              >
                <Text>{rowData.jobAddress}</Text>
              </TouchableOpacity>
            }
          />
        </View>
      );
    } else {
      return (
        <View style={styles.listStyle}>
          <Text style={styles.userStyle}>
            {"Receipts"}
          </Text>
          <ListView
            dataSource={this.state.receipts}
            renderRow={(rowData) =>
              <Text>
                <Text style={styles.textStyle}>{"Job ID: " + rowData.jobId}</Text>
                <Text style={styles.textStyle}>{"Purchased From: " + rowData.purchasedFrom}</Text>
                <Text style={styles.textStyle}>{"PO #: " + rowData.poNumber}</Text>
                <Text style={styles.textStyle}>{"Part Name: " + rowData.partName}</Text>
                <Text style={styles.textStyle}>{"Total: " + rowData.totalPrice}</Text>
                <Text style={styles.textStyle}>{"Price Per Unit: " + rowData.price}</Text>
              </Text>
            }
          />
          <TouchableOpacity
            style={styles.changeId}
            onPress={() => this._getJobs()}
          >
            <Text style={styles.textStyle}>{"Back To Jobs"}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = {
  listStyle: {
    width: 400,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#5C77E6',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    elevation: 15,
    marginTop: 15,
  },

  userStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 'auto',
    marginBottom: 'auto',
    color: 'white',
    textAlign: 'left',
    borderColor: 'white',
    borderBottomWidth: 1,
    height: 50,
  },

  textStyle: {
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
  },

  buttonStyle: {
    borderWidth: 1,
    borderColor: 'blue',
    borderStyle: 'solid',
    borderRadius: 10,
    backgroundColor: 'transparent',
  }
}

export default Jobs;