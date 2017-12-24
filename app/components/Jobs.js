import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, ScrollView, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Location from '../components/Location.js';

class Jobs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
        };
    }

    async _getJobs() {
        let id = await AsyncStorage.getItem('userId');
        fetch('https://spring-clock.herokuapp.com/rest/jobs/assigned/employee/' + id)
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                });
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this._getJobs();
    }

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <Text style={styles.listStyle}>
                            <Text style={styles.userStyle} >
                               
                            </Text>

                            <Text style={styles.listStyle} >
                                {"Business ID: " + rowData.jobAddress}
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

export default Jobs;