import React from 'react';
import { View, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements'; // Certifique-se de que os componentes de UI sejam compatíveis
import DatePicker from 'react-native-datepicker'; // Ajuste conforme necessário

interface FormInputsProps {
    north: string;
    south: string;
    east: string;
    west: string;
    cloudCoverage: string;
    setCloudCoverage: (value: string) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    maxScenes: string;
    setMaxScenes: (value: string) => void;
    handleSearch: () => void;
}

const FormInputs: React.FC<FormInputsProps> = ({
    north,
    south,
    east,
    west,
    cloudCoverage,
    setCloudCoverage,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    maxScenes,
    setMaxScenes,
    handleSearch,
}) => {
    console.log("Rendering FormInputs with values:", { north, south, east, west, cloudCoverage, startDate, endDate, maxScenes });

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Input
                label="Norte"
                placeholder="Norte..."
                value={north}
                editable={false} // Mantenha como false, se for apenas para exibição
                secureTextEntry={false}
            />
            <Input
                label="Sul"
                placeholder="Sul..."
                value={south}
                editable={false}
                secureTextEntry={false}
            />
            <Input
                label="Leste"
                placeholder="Leste..."
                value={east}
                editable={false}
                secureTextEntry={false}
            />
            <Input
                label="Oeste"
                placeholder="Oeste..."
                value={west}
                editable={false}
                secureTextEntry={false}
            />
            <DatePicker
                style={{ width: '100%' }}
                date={startDate}
                mode="date"
                placeholder="Data Inicial"
                format="YYYY-MM-DD"
                minDate="2020-05-01"
                maxDate="2030-12-31"
                onDateChange={setStartDate}
            />
            <DatePicker
                style={{ width: '100%' }}
                date={endDate}
                mode="date"
                placeholder="Data Final"
                format="YYYY-MM-DD"
                minDate="2020-05-01"
                maxDate="2030-12-31"
                onDateChange={setEndDate}
            />
            <Input
                label="Cobertura de nuvem (máx)"
                placeholder="Cobertura de nuvem"
                value={cloudCoverage}
                onChangeText={setCloudCoverage}
                keyboardType="numeric"
            />
            <Input
                label="Número de cenas por dataset (máx)"
                placeholder="Número de cenas por dataset"
                value={maxScenes}
                onChangeText={setMaxScenes}
                keyboardType="numeric"
            />
            <Button title="Filtrar" onPress={handleSearch} />
        </ScrollView>
    );
};

export default FormInputs;