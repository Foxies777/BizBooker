import { Navbar } from "../../Business";
import AddCategorysForm from "./AddCategory";
import CategoriesList from "./CategoriesList";

const Admin = () => {
    return (
        <>
            <Navbar />
            <AddCategorysForm />
            <CategoriesList/>
        </>
    );
};

export default Admin;
