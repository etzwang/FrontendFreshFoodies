import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StorageImage from '../assets/StorageTitle.png'; // Import the image

function InventoryScreen() {
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={24} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search all"
                    placeholderTextColor="#888"
                />
            </View>

            {/* First set of inventory */}
            <InventoryContent />

            {/* Add Item Button */}
            <TouchableOpacity style={styles.addItemButton}>
                <Text style={styles.addItemButtonText}>Add Item</Text>
            </TouchableOpacity>
        </View>
    );
}

function InventoryContent() {
    return (
        <View>
            {/* Top rectangle with "Storage" */}
            <ImageBackground
                source={StorageImage}
                style={{width:"100%", height:60}}
                resizeMode="cover"
            >
                <Text style={styles.storageText}>Fruit</Text>
            </ImageBackground>

            {/* Header row */}
            <View style={styles.headerRow}>
                <Text style={styles.headerText}>Food</Text>
                <Text style={styles.headerText}>Amount</Text>
                <Text style={styles.headerText}>Expiration</Text>
                <Text style={styles.headerText}>Action</Text>
            </View>

            {/* Sample Inventory Items */}
            {renderInventoryItem('Apple', '5', '2024-03-10')}
            {renderInventoryItem('Banana', '3', '2024-03-15')}
            {renderInventoryItem('Orange', '4', '2024-03-12')}
            {renderInventoryItem('Grapes', '2', '2024-03-18')}

            {/* Top rectangle with "Storage" */}
            <ImageBackground
                source={StorageImage}
                style={{width:"100%", height:60}}
                resizeMode="cover"
            >
                <Text style={styles.storageText}>Pantry</Text>
            </ImageBackground>

            {/* Header row */}
            <View style={styles.headerRow}>
                <Text style={styles.headerText}>Food</Text>
                <Text style={styles.headerText}>Amount</Text>
                <Text style={styles.headerText}>Expiration</Text>
                <Text style={styles.headerText}>Action</Text>
            </View>

            {/* Sample Inventory Items */}
            {renderInventoryItem('Apple', '5', '2024-03-10')}
            {renderInventoryItem('Banana', '3', '2024-03-15')}
            {renderInventoryItem('Orange', '4', '2024-03-12')}
            {renderInventoryItem('Grapes', '2', '2024-03-18')}
        </View>
    );
}

function renderInventoryItem(food, amount, expiration) {
    return (
        <View style={styles.inventoryItem}>
            <Text style={styles.inventoryItemText}>{food}</Text>
            <Text style={styles.inventoryItemText}>{amount}</Text>
            <Text style={styles.inventoryItemText}>{expiration}</Text>
            <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="ellipsis-horizontal" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    storageText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        paddingTop: 10,
        fontWeight:"bold",
    },
    headerRow: {
        backgroundColor: '#808080',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        color: '#FFFFFF'
    },
    inventoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 12,
    },
    inventoryItemText: {
        flex: 1,
        textAlign: 'center',
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
    },
    addItemButton: {
        backgroundColor: '#FFC531',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginTop: 20,
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    addItemButtonText: {
        color: 'white',
        fontSize: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 30,
        borderWidth: 1,
        borderColor: 'black',
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchBar: {
        flex: 1,
        height: 40,
    },
});

export default InventoryScreen;
