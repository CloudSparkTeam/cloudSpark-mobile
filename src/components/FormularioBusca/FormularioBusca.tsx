import React from 'react';
import { View, ScrollView } from 'react-native';
import { Input, Button } from 'react-native-elements'; // Certifique-se de que os componentes de UI sejam compatíveis
// import DatePicker from 'react-native-date-picker'; // Ajuste conforme necessário
import DatePicker from '../../components/DatePicker';

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
                label="Data Inicial:"
                onDateChange={setStartDate}
            />
            <DatePicker
                label="Data Final:"
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
        </ScrollView>
    );
};

export default FormInputs;