const mongoose = require("mongoose");

const ProviderCategorySchema = new mongoose.Schema({
    category: { 
        type: String, 
        enum: ['photographer', 'stylist', 'makeup artist', 'hair stylist', 'decorator'], 
        required: true 
    },
    image_url: { type: String, required: true }
});

const ProviderCategory = mongoose.model('ProviderCategory', ProviderCategorySchema, "provider_categories");


//SEED TABLE
const seedCategories = async () => {
	const categories = [
		{ category: "photographer", image_url: "https://images.unsplash.com/photo-1535541101896-f876093ebce3?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { category: "stylist", image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { category: "makeup artist", image_url: "https://images.pexels.com/photos/1977292/pexels-photo-1977292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { category: "hair stylist", image_url: "https://images.pexels.com/photos/3993320/pexels-photo-3993320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
        { category: "decorator", image_url: "https://images.pexels.com/photos/4577179/pexels-photo-4577179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" }
	];
  
    try {
        const existingCategories = await ProviderCategory.find();

        // Check the length of the fetched documents
        if (existingCategories.length === 0) {
            await ProviderCategory.insertMany(categories);
            console.log("Categories seeded successfully");
        } else {
            console.log("Categories already exist, no need to seed.");
        }
    } catch (error) {
        console.error("Error seeding:", error);
    }
};

// await seedCategories();

const startSeeding = async () => {
    try {

        await seedCategories();

    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};
  
startSeeding();

module.exports =  ProviderCategory;


