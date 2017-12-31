import React, { Component }                        from 'react';
import { ActivityIndicator, ListView, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

class Receipts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bizId: '',
      jobId: '',
    }
    const { params } = this.props.navigation.state;
  }
  _getReceiptsTest() {
    if (!this.params) {
        console.log('not gonna happen');
    } else {
        fetch('https://spring-clock.herokuapp.com/rest/jobs/' + this.params.jobId + '/material')
        .then((response) => response.json())
        .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2, r3, r4, r5, r6) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
            });
        })
        .catch((error) => {
            console.error(error);
        });  
    }
  }

  _getReceipts(id) {
    fetch('https://spring-clock.herokuapp.com/rest/jobs/' + id + '/material')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2, r3, r4, r5, r6) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() { 
    this._getReceiptsTest();
    this.timer = setInterval(()=> this._getReceiptsTest(), 5000);
  }

  render() {   
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
          {this.state._getReceiptsTest()}
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) =>
          <Text style={ styles.listStyle }>
            <Text style={ styles.userStyle } >
              {rowData.user + " "}
            </Text>

            <Text style={ styles.listStyle } >
              {"Job ID: " + rowData.jobId},
              {"Purchased From: " + rowData.purchasedFrom},
              {"PO #: " + rowData.poNumber},
              {"Part Name: " + rowData.partName},
              {"Total: " + rowData.totalPrice},
              {"Quantity: " + rowData.quantity},
              {"Price Per Unit: " + rowData.price},
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
