import React, {useEffect, useState} from 'react';
import {getAssessments} from '../storage';
import {ActivityIndicator, Button, FlatList, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {styles} from './styles';

export function HomeScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState(null);

  useEffect(() => {
    const getData = () => {
      getAssessments()
        .then((data) => {
          setAssessments(data || []);
          setLoading(false);
          console.log(data);
        })
        .catch(() => {
          setLoading(false);
        });
    };
    getData();
  }, [setLoading, setAssessments]);
  return (
    <View style={styles.body}>
      <View
        style={{
          height: 200,
          backgroundColor: Colors.lighter,
        }}
      />
      <View style={styles.sectionContainer}>
        {loading && <ActivityIndicator />}
        {!!assessments && (
          <FlatList
            data={assessments}
            renderItem={({index}) => (
              <Button
                title={'Assessment #' + index}
                onPress={() =>
                  navigation.navigate('Assessment', {assessmentIndex: index})
                }
              />
            )}
            keyExtractor={(item) => item.createdAt + ''}
          />
        )}
      </View>
    </View>
  );
}
