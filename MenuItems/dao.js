import model from "./model.js";

export const createMenuItem = (menuItem) => {
    delete menuItem._id;
    return model.create(menuItem);
};

export const findAllMenuItems = () => model.find();
export const findMenuItemById = (menuItemId) => model.findById(menuItemId);
export const findMenuItemsForRestaurant = (restaurant_id) => {
    return model.find({restaurant_id: restaurant_id});
};

export const findMenuItemsForChef = (chef_id) => {
    return model.find({chef_id: chef_id});
};

export const updateMenuItem = (menuItemId, menuItem) => model.updateOne({_id: menuItemId}, {$set: menuItem});
export const deleteMenuItem = (menuItemId) => model.deleteOne({ _id: menuItemId});