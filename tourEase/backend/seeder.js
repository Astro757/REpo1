const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('./models/Place'); // Adjust path
const Guide = require('./models/Guide'); // Adjust path
const Review = require('./models/Review'); // Adjust path
const User = require('./models/User'); // Adjust path
const connectDB = require('./config/db'); // Adjust path

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Place.deleteMany();
        await Guide.deleteMany();
        await Review.deleteMany();
        await User.deleteMany();

        console.log('Data Cleared...');

        // Create Users
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@tourease.com',
            password: '$2a$10$YourHashedPasswordHereOrJustRegisterIdeally', // Placeholder hash
            role: 'admin'
        });

        const normalUser = await User.create({
            name: 'John Traveler',
            email: 'john@example.com',
            password: 'password123', // This won't work for login unless hashed properly via auth route, but good for reference
            role: 'user'
        });

        // SAMPLE PLACES
        const places = await Place.insertMany([
            {
                name: 'Bali, Indonesia',
                description: 'Experience the tropical paradise of Bali. Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
                image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop',
                nearbyAttractions: [{ name: 'Uluwatu Temple', distance: '10km' }, { name: 'Sacred Monkey Forest', distance: '5km' }]
            },
            {
                name: 'Paris, France',
                description: 'The City of Light draws millions of visitors every year with its unforgettable ambiance. The cuisine is as famous as its landmarks.',
                image: 'https://images.unsplash.com/photo-1499856871940-b09fe5580e13?q=80&w=1000&auto=format&fit=crop',
                nearbyAttractions: [{ name: 'Eiffel Tower', distance: '2km' }, { name: 'Louvre Museum', distance: '3km' }]
            },
            {
                name: 'Santorini, Greece',
                description: 'Recognizable for its whitewashed,cubiform houses. The rugged landscape was shaped by a volcanic eruption in the 16th century BC.',
                image: 'https://images.unsplash.com/photo-1613395877344-13d4c2ce5d4d?q=80&w=1000&auto=format&fit=crop',
                nearbyAttractions: [{ name: 'Oia Castle', distance: '1km' }, { name: 'Red Beach', distance: '8km' }]
            },
            {
                name: 'Kyoto, Japan',
                description: 'Kyoto is famous for its numerous classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.',
                image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
                nearbyAttractions: [{ name: 'Fushimi Inari-taisha', distance: '4km' }, { name: 'Kinkaku-ji', distance: '7km' }]
            },
            {
                name: 'Machu Picchu, Peru',
                description: 'A 15th-century Inca citadel, located in the Eastern Cordillera of southern Peru on a 2,430-metre mountain ridge.',
                image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1000&auto=format&fit=crop',
                nearbyAttractions: [{ name: 'Sun Gate', distance: '1km' }, { name: 'Temple of the Sun', distance: '0.5km' }]
            },
            {
                name: 'New York City, USA',
                description: 'The city that never sleeps. Famous for its iconic skyline, Central Park, Broadway shows, and diverse culture.',
                image: 'https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?q=80&w=1000&auto=format&fit=crop',
                nearbyAttractions: [{ name: 'Statue of Liberty', distance: '5km' }, { name: 'Times Square', distance: '0km' }]
            }
        ]);

        // SAMPLE GUIDES
        await Guide.insertMany([
            {
                name: 'Sarah Jenkins',
                gender: 'Female',
                placeId: places[1]._id, // Paris
                contact: 'sarah.j@tourease.com',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
                bio: 'Expert in French history and art.'
            },
            {
                name: 'Kenji Sato',
                gender: 'Male',
                placeId: places[3]._id, // Kyoto
                contact: 'kenji.s@tourease.com',
                image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
                bio: 'Local Kyoto resident for 20 years.'
            },
            {
                name: 'Maria Garcia',
                gender: 'Female',
                placeId: places[0]._id, // Bali (Just example)
                contact: 'maria.g@tourease.com',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
                bio: 'Passionate about nature and hiking.'
            },
            {
                name: 'David Smith',
                gender: 'Male',
                placeId: places[5]._id, // NYC
                contact: 'david.nyc@tourease.com',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
                bio: 'Urban explorer and food critic.'
            }
        ]);

        // SAMPLE REVIEWS
        await Review.insertMany([
            {
                userId: normalUser._id,
                rating: 5,
                comment: "The trip to Bali was absolutely magical! The guide was so helpful."
            },
            {
                userId: normalUser._id,
                rating: 4,
                comment: "Paris is beautiful but crowded. Hotel booking through TourEase was smooth though."
            },
            {
                userId: normalUser._id,
                rating: 5,
                comment: "Loved the Kyoto temple tour. Highly recommended!"
            }
        ]);

        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
