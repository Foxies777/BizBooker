import { createEffect, createEvent, createStore, sample } from "effector";
import {
    Business,
    Category,
    CreateBusinessRequest,
    CreateCategoryRequest,
} from "../api/business/model";
import { createBusiness, createCategory } from "../api/business";
import { showSuccessMessageFx } from "../notification";
import { tokenExprired } from "../auth";

export const addBusiness = createEvent<CreateBusinessRequest>();
export const addCategory = createEvent<CreateCategoryRequest>();

export const resetForm = createEvent<void>();

export const addBusinessFx = createEffect(
    async (business: CreateBusinessRequest) => {
        console.log("addBusinessFx", business);

        const response = await createBusiness(business);
        return response;
    }
);
export const addCategoryFx = createEffect(
    async (category: CreateCategoryRequest) => {
        console.log("addCategoryFx", category);
        const response = await createCategory(category);
        return response;
    }
);

sample({
    clock: addCategoryFx.doneData,
    fn: () => "Категория добавлена",
    target: [showSuccessMessageFx, resetForm],
});

sample({
    clock: addBusiness,
    target: addBusinessFx,
});

sample({
    clock: addCategory,
    target: addCategoryFx,
});

export const $businesses = createStore<Business[]>([])
    .on(addBusinessFx.doneData, (state, newBusiness) => [...state, newBusiness])
    .on(addBusinessFx.failData, (state, error) => {
        console.error("Failed to create business:", error);
        return state;
    })
    .reset(tokenExprired);

export const $categories = createStore<Category[]>([])
    .on(
        addCategoryFx.doneData,
        (state, newCategory) => [...state, newCategory] as Category[]
    )
    .on(addCategoryFx.failData, (state, error) => {
        console.error("Failed to create category:", error);
        return state;
    })
    .reset(tokenExprired);

export const setCurrentBusiness = createEvent<any>();

const initialBusiness = JSON.parse(
    localStorage.getItem("currentBusiness") || "null"
);

export const $currentBusiness = createStore<any>(initialBusiness)
    .on(setCurrentBusiness, (_, business) => business)
    .reset(tokenExprired);
