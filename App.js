import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// List of animals
const animeData = [
  { name: 'Attack on Titan', image: require('./img/Attack_On_Titan.jpg') },
  { name: 'Death Note', image: require('./img/Death_Note.jpg') },
  { name: 'My Hero Academia', image: require('./img/My_Hero_Academia.jpg') },
  { name: 'One Piece', image: require('./img/One_Piee.jpg') },
  { name: 'Spirited Away', image: require('./img/Spirited_Away.jpg') },
  { name: 'That time I got Reincarnated as a Slime', image: require('./img/Tensura.jpg') },
];

// Randomly select 3 animals
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
        <StatusBar style="auto" />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allow the container to grow with content
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignItems: 'center',
  },
  questionContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 200,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20, // Add some margin for better spacing
  },
  buttonContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
  },
});
