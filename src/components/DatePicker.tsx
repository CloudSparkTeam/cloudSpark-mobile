import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';

interface DatePickerComponentProps {
  label: string;
  onDateChange: (date: string) => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ label, onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleConfirm = (selectedDate: Date) => {
    setOpen(false);
    setDate(selectedDate);
    const formattedDate = selectedDate.toLocaleDateString('pt-BR'); 
    onDateChange(formattedDate); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.inputContainer} onPress={() => setOpen(true)}>
        <Text style={styles.input}>{date.toLocaleDateString('pt-BR')}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        locale="pt-BR"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '93%',
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888888',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default DatePickerComponent;
