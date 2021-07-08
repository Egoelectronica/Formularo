import React, {useState, useEffect} from 'react';
import firestore  from '@react-native-firebase/firestore';
import { StyleSheet, FlatList, Alert, View, Modal, TouchableOpacity, Image, Text } from 'react-native';
import { TextInput, FAB, Surface, Checkbox, Subheading, Button, Appbar, IconButton } from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function ListMachines({navigation}) {

    const [machines, setMachines] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);

    const [machineType, setMachineType] = useState('');
    const [reference, setReference] = useState('');
    const [damage, setDamage] = useState('');
    const [observations, setObservations] = useState('');
    const [maintenance, setMaintenance] = useState(false);
    const [repair, setRepair] = useState(false);
    const [filePath, setFilePath] = useState();


    const saveEntry = () => {
        firestore().collection('Machines')
        .add({
            machineType: machineType,
            reference: reference,
            damage: damage,
            maintenance:maintenance,
            repair:repair
        })   
        .then(
            setMachineType(''),
            setReference(''),
            setDamage(''),
            setRepair(false),
            setMaintenance(false),
            navigation.navigate('ListMachines')
        )
    }

    const chooseImage = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                {
                name: 'customOptionKey',
                title: 'Choose Photo from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        launchImageLibrary(options, response => {
            let path = response.assets
            let uri = response.assets.map(x => (x.uri))
            setFilePath(JSON.stringify(uri))
            console.log(response.assets)
        });
    }

    useEffect(() => {
        getMachines()
    }, [])

    const getMachines = async() => {
        try{
            firestore().collection('Machines').onSnapshot(querySnapshot => {
                const list = [];
                querySnapshot.forEach(doc => {
                    const { 
                        damage,
                        machineType,
                        maintenance,
                        referende,
                        repair
                    } = doc.data();
                    list.push({
                        id: doc.id,
                        damage,
                        machineType,
                        maintenance,
                        referende,
                        repair
                    });
                })
                setLoading(false)
                setMachines(list)
            });

        }catch(e){
            Alert.alert(
                'Lo sentimos mucho',
                'En este momento es imposible mostrarte el listado, estás teniendo problemas de conexión' + e
            )
            console.log(e)
        }
    }

    return (
        <Surface style={styles.surface}>
            <FlatList
                data={machines}
                showsVerticalScrollIndicator={false}
                refreshing={true}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View key={item.id} >
                        <Subheading>{item.damage}</Subheading>
                    </View>
                )}
            />
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <Appbar.Header>
                    <Appbar.BackAction onPress={() => setModalVisible(!modalVisible)} />
                    <Appbar.Content title="Agregar máquina" />
                    <Appbar.Action icon="image-plus"  onPress={chooseImage} />
                </Appbar.Header>
                <View style={styles.containerModal}>
                    <TextInput
                        style={styles.input}
                        label="Tipo de máquina"
                        value={machineType}
                        onChangeText={machineType => setMachineType(machineType)}
                    />
                    <TextInput
                        style={styles.input}
                        label="Referencia"
                        value={reference}
                        onChangeText={reference => setReference(reference)}
                    />
                    <TextInput
                        style={styles.input}
                        label="Causa/Daño"
                        value={damage}
                        onChangeText={damage => setDamage(damage)}
                    />
                    <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                            <Checkbox
                                status={maintenance ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setMaintenance(!maintenance);
                                }}
                            />
                            <Subheading>Mantenimiento</Subheading>
                        </View>
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                            <Checkbox
                                status={repair ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setRepair(!repair);
                                }}
                            />
                            <Subheading>Reparación</Subheading>
                        </View>
                    </View>
                    <Image
                        source={{uri: filePath}}
                    />
                    <Subheading>{filePath} </Subheading>
                </View>
                <Button 
                    onPress={saveEntry}
                    mode='contained'
                    uppercase={false}
                    contentStyle={{padding:'1%'}}
                    labelStyle={{fontSize:18}}
                    disabled={(machineType == '' || reference == '' || damage == '') ? true : false}
                >
                    Guardar
                </Button>
            </Modal>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => setModalVisible(true)}
            />
        </Surface>
    );
}

const styles = StyleSheet.create({
    surface: {
        width:'100%',
        height:'100%'
    },
    containerModal:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around',
        margin:'2%'
    },
    input:{
        backgroundColor:'#FFF',
    },  
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
    },
})