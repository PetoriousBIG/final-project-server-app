import * as dao from "./dao.js";
export default function MenuItemRoutes(app) {
    
    const createMenuItem = async (req, res) => {
        const menuItem = await dao.createMenuItem(req.body);
        res.json(menuItem);
    }
    app.post("/api/menu-items", createMenuItem);

    const deleteMenuItem = async (req, res) => {
        const status = await dao.deleteMenuItem(req.params.iid);
        res.json(status);
    }
    app.delete("/api/menu-items/:iid", deleteMenuItem);

    const findAllMenuItems = async (req, res) => {
        const { restaurant_id, chef_id } = req.query;
        if (restaurant_id) {
            const menuItems = await dao.findMenuItemsForRestaurant(restaurant_id);
            res.json(menuItems);
            return;
        }
        if (chef_id) {
            res.json(menuItems);
            return;
        }
        const menuItems = await dao.findAllMenuItems()
        res.json(menuItems);
        return;
    }
    app.get("/api/menu-items", findAllMenuItems);

    const findMenuItemById = async (req, res) => {
        const menuItem = await dao.findMenuItemById(req.params.iid);
        res.json(menuItem);
    }
    app.get("/api/menu-items/:iid", findMenuItemById);

    const updateMenuItem = async (req, res) => {
        const {iid} = req.params;
        const status = await dao.updateMenuItem(iid, req.body);
        res.json(status);
    };
    app.put("/api/menu-items/:iid", updateMenuItem);
}