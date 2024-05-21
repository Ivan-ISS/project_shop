import styles from './searchForm.module.scss';
import { searchFormFileds } from '../../data';
import { useState, FormEvent } from 'react';
import { useAppDispatch } from '../../redux/store';
import { applyFilters, resetFilters } from '../../redux/slices/filtersSlice/filtersSlice';
import Input from '../../Components/Common/Input/Input';
import Button from '../../Components/Common/Button/button';

export default function SearchForm() {
    const [ formData, setFormData ] = useState({ productName: '', priceFrom: null, priceTo: null });
    const dispatch = useAppDispatch();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(applyFilters(formData));
    };

    const handleResetFilters = () => {
        dispatch(resetFilters());
        setFormData({ productName: '', priceFrom: null, priceTo: null });
    };

    const handleChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: event.target.value
        }));
    };

    return (
        <form className={styles.searchFrom} onSubmit={handleSubmit}>
            <div className={styles.productsSearch}>
                {searchFormFileds.map((searchFormFiled, index) => 
                    <Input
                        key={index}
                        name={searchFormFiled.name}
                        type={searchFormFiled.type}
                        onChange={(event) => handleChange(searchFormFiled.var, event)}
                    />
                )}
            </div>
            <div className={styles.buttonPanel}>
                <Button text={'Search products'} fontSize={'big'} color={'black'} type="submit"/>
                <Button text={'Reset filters'} fontSize={'big'} color={'red'} type="reset" onClick={handleResetFilters}/>
            </div>
        </form>
    );
}
