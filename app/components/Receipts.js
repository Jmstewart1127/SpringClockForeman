import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, ScrollView, AsyncStorage } from 'react-native';

class Receipts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bizId: '',
      receipts: [],
    }
  }

  componentDidMount() {

  }

  _getReceipts(jobId) {
    var rec = [];
    fetch('https://spring-clock.herokuapp.com/rest/jobs/' + jobId + '/material')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(jobId);
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2, r3, r4, r5, r6) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
          receipts: rec,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { jobId } = this.props;
    this._getReceipts(this.props.jobId);
    console.log(this._getReceipts(this.props.jobId));
    // console.log(this._getReceipts(this.props.jobId));
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
        </View>
      );
    }
  
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <Text style={styles.listStyle}>
              <Text style={styles.userStyle} >
                {rowData.user + " "}
              </Text>
              <Text style={styles.listStyle} >
                {"Business ID: " + rowData.bizId},
                {"Week Time: " + rowData.weekTimeInHours},
                {"Pay Rate: " + rowData.payRate},
                {"Period Pay: " + rowData.totalPay},
                {"Clock In Status: " + rowData.clocked}
              </Text>
            </Text>
          }
        />
      </View>
    );
  }
}

const styles = {
  listStyle: {
    textAlign: 'left',
    borderRadius: 0,
    borderWidth: 1,
    backgroundColor: '#F3F1F1',
    padding: 10,
  },

  userStyle: {
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
  }

}

export default Receipts;
