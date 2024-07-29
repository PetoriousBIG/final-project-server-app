export default function Hello(app) {
    app.get('/', (req, res) => {
        res.send('Final Project Hello World!')
    });
}