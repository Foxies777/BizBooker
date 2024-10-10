import { createEffect, createEvent, createStore } from "effector";
import {
    Business,
    Category,
    CreateBusinessRequest,
    CreateCategory,
} from "../api/business/model";
import { createBusiness, createCategory } from "../api/business";


export const addBusiness = createEvent<CreateBusinessRequest>();
export const addCategory = createEvent<CreateCategory>();

export const addBusinessFx = createEffect(
    async (business: CreateBusinessRequest) => {
        console.log("addBusinessFx", business);

        const response = await createBusiness(business);
        return response;
    }
);

export const addCategoryFx = createEffect(async (category: CreateCategory) => {
    console.log("addCategoryFx", category);
    const response = await createCategory(category);
    return response;
});


addBusiness.watch((business) => {
    addBusinessFx(business);
});

addCategory.watch((category) => {
    addCategoryFx(category);
});

export const $businesses = createStore<Business[]>([])
    .on(addBusinessFx.doneData, (state, newBusiness) => [...state, newBusiness])
    .on(addBusinessFx.failData, (state, error) => {
        console.error("Failed to create business:", error);
        return state;
    });

export const $categories = createStore<Category[]>([])
    .on(
        addCategoryFx.doneData,
        (state, newCategory) => [...state, newCategory] as Category[]
    )
    .on(addCategoryFx.failData, (state, error) => {
        console.error("Failed to create category:", error);
        return state;
    });
