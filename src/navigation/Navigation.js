import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import ListClients from '../layouts/clients/ListClient';
import ListMachines from '../layouts/forms/ListMachines';

const MachinesStack = createStackNavigator();
const MachinesStackScreen = () => (
    <MachinesStack.Navigator

    >
        <MachinesStack.Screen 
            name="ListMachines" 
            component={ListMachines} 
            options={{
                title: 'Máquinas',
                headerLeft:null,
                headerTitleAlign:'center',
            }}
            
        />
    </MachinesStack.Navigator>
);


const AppTabs = createBottomTabNavigator();
const AppsTabsScreen = () => (
    <AppTabs.Navigator
        options={{ headerShown: false}}
        initialRouteName="Form"
        tabBarOptions={{
        labelPosition:'below-icon',
        activeTintColor:'#ff4033',
        labelStyle:{fontSize:13, marginTop:'-2%',marginBottom:'1%', },
        inactiveTintColor:'#c2c2c2',
        }}
    >

        <AppTabs.Screen
            name="Form"
            component={MachinesStackScreen}
            options={{
                tabBarLabel: 'Máquinas',
                headerStyle: {
                    backgroundColor: '#ff4033',
                },
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="clipboard-list-outline" color={color} size={25} />
                )
            }}
        
        />
        <AppTabs.Screen
            name="Clients"
            component={ListClients}
            options={{
                tabBarLabel: 'Clientes',
                headerStyle: {
                    backgroundColor: '#ff4033',
                },
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account-group-outline" color={color} size={25} />
                )
            }}
        
        />
    </AppTabs.Navigator>
)

const RootStack = createStackNavigator();

const RootStackScreen = () => {
    return(
        <RootStack.Navigator initialRouteName='App' headerMode="none"
        >
            <RootStack.Screen
                name="App"
                component={AppsTabsScreen}
                options={{
                animationEnabled: false
                }}
            />
            
        </RootStack.Navigator>
    )
}

export default () => {
    return(
        <NavigationContainer>
            <RootStackScreen/>
        </NavigationContainer>
    )
}