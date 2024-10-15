import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DatePickerComponent from '../components/DatePicker';

const FormPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <DatePickerComponent label="Selecione a data:" onDateChange={handleDateChange} />
      {selectedDate && <Text>Data selecionada: {selectedDate}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default FormPage;
