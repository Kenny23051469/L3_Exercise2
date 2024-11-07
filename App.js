import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const animeData = [
  { name: 'Attack on Titan', image: require('./img/Attack_On_Titan.jpg') },
  { name: 'Death Note', image: require('./img/Death_Note.jpg') },
  { name: 'My Hero Academia', image: require('./img/My_Hero_Academia.jpg') },
  { name: 'One Piece', image: require('./img/One_Piee.jpg') },
  { name: 'Spirited Away', image: require('./img/Spirited_Away.jpg') },
  { name: 'That time I got Reincarnated as a Slime', image: require('./img/Tensura.jpg') },
];

const getRandomQuestions = (data, num) => {
  const shuffled = data.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const questions = getRandomQuestions(animeData, 3);

export default function App() {
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(''));

  const handlePickerChange = (value, index) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = value;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const correctAnswers = selectedAnswers.filter((answer, index) => answer === questions[index].name).length;
    let feedback = '';
    if (correctAnswers === questions.length) {
      feedback = "Well done!";
    } else if (correctAnswers > questions.length / 2) {
      feedback = "Good job!";
    } else {
      feedback = "You can do better next time.";
    }
    Alert.alert(`You got ${correctAnswers} out of ${questions.length} correct! ${feedback}`);
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>
          <Icon name="file-movie-o" size={20} /> Guess the Anime Quiz
        </Text>
        {questions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Image
                  source={question.image}
                  style={styles.image}
                  accessibilityLabel={`Image of a ${question.name}`}
              />
              <Text style={styles.questionText}>What Anime is this?</Text>
              <Picker
                  selectedValue={selectedAnswers[index]}
                  style={styles.picker}
                  onValueChange={(value) => handlePickerChange(value, index)}
              >
                <Picker.Item label="Select an option" value="" />
                {animeData.map((anime, idx) => (
                    <Picker.Item key={idx} label={anime.name} value={anime.name} />
                ))}
              </Picker>
            </View>
        ))}
        <View style={styles.buttonContainer}>
          <Button title="Submit Answers" onPress={handleSubmit} />
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  questionContainer: {
    marginVertical: 15,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ccf3f8',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
    color: '#333',
  },
  picker: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
});
