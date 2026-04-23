const { Product, Category, sequelize } = require('./src/models');

const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        const categories = await Category.bulkCreate([
            { name: 'Moda Cyber', description: 'Ropa futurista y accesorios' },
            { name: 'Equipamiento', description: 'Hardware y gadgets para ciber-rebeldes' },
            { name: 'Implantes', description: 'Software y mejoras neuronales' }
        ]);

        await Product.bulkCreate([
            {
                name: 'Chaqueta Pulso Neón',
                description: 'Chaqueta con hilos de fibra óptica sincronizados con el ritmo cardíaco.',
                price: 299.99,
                stock: 15,
                categoryId: categories[0].id,
                imageUrl: '/uploads/jacket.png'
            },
            {
                name: 'Sudadera Eléctrica',
                description: 'Tejido conductivo con blindaje contra pulsos electromagnéticos.',
                price: 189.50,
                stock: 20,
                categoryId: categories[0].id,
                imageUrl: '/uploads/hoodie.png'
            },
            {
                name: 'Top de Malla Cyber',
                description: 'Malla translúcida con patrones de glitch reactivos.',
                price: 159.00,
                stock: 10,
                categoryId: categories[0].id,
                imageUrl: '/uploads/mesh.png'
            },
            {
                name: 'Visor KNG-7',
                description: 'Realidad aumentada con filtrado de datos en tiempo real.',
                price: 450.00,
                stock: 5,
                categoryId: categories[1].id
            }
        ]);

        console.log('Base de datos poblada exitosamente');
        process.exit();
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
};

seedDatabase();
