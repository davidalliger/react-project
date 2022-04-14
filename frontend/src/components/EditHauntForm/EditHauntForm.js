import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editHaunt } from '../../store/haunts';
import { useParams, useHistory } from 'react-router-dom';
import './EditHauntForm.css';

const EditHauntForm = ({setShowEditHauntModal}) => {
    const states = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'PennsylvaniaRhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ];

    const countries = [
        'United States',
        'Brazil',
        'Canada',
        'China',
        'Egypt',
        'France',
        'Germany',
        'Greece',
        'India',
        'Italy',
        'Japan',
        'Mexico',
        'Poland',
        'Portugal',
        'Romania',
        'Russia',
        'Spain',
        'Sweden',
        'Switzerland',
        'United Kingdom',
        'Other'
    ];
    const {hauntId} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const haunts = useSelector(state => state.haunts);
    const haunt = haunts[hauntId];
    const [name, setName] = useState(haunt.name);
    const [address, setAddress] = useState(haunt.address);
    const [city, setCity] = useState(haunt.city);
    const [country, setCountry] = useState(countries.includes(haunt.country) ? haunt.country : 'Other');
    const [state, setState] = useState(haunt.state ? haunt.state : '');
    const [other, setOther] = useState(countries.includes(haunt.country) ? '' : haunt.country);
    const [latitude, setLatitude] = useState(haunt.latitude);
    const [longitude, setLongitude] = useState(haunt.longitude);
    const [rate, setRate] = useState(haunt.rate);
    const [description, setDescription] = useState(haunt.description);
    const [showState, setShowState] = useState(haunt.country === 'United States');
    const [showOther, setShowOther] = useState(!(countries.includes(haunt.country)));
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const [imageFieldCount, setImageFieldCount] = useState(haunt.Images.length);

    const getInitialUrls = (images) => {
        let urls = {}
        if (images.length) {
            for (let i = 0; i < images.length; i++) {
                let key = i;
                let image = images[i];
                urls[key] = image.url
            }
        }
        return urls;
    }
    const getInitialUrlsWithId = (images) => {
        let oldImages = {};
        if (images.length) {
            for (let i = 0; i < images.length; i++) {
                let key = i;
                let image = images[i];
                oldImages[key] = {
                    url: image.url,
                    id: image.id
                }
            }
        }
        return oldImages;
    }
    const initialUrlsWithId = getInitialUrlsWithId(haunt.Images);
    const initialUrls = getInitialUrls(haunt.Images);
    const [imageUrls, setImageUrls] = useState(initialUrls);

    useEffect(() => {
        if (country === 'United States') {
            setShowState(true);
        } else if (country === 'Other') {
            setShowOther(true);
        } else {
            setShowState(false);
            setShowOther(false);
        }

        return () => {
            setShowState(false);
            setShowOther(false);
        }
    }, [country]);

    useEffect(() => {
        if(!sessionUser) {
            history.push('/login');
        }
    }, [sessionUser, history]);

    const generateImageFields = (count) => {
        const imageFields = []
        for (let i = 0; i < count; i++) {
            imageFields.push(
                <div className='auth-form-field' key={i}>
                    <label htmlFor={`image-url-${i}`}>
                        Image URL:
                        <input
                            type='text'
                            id={`image-url-${i}`}
                            name='imageUrl1'
                            className='auth-form-input'
                            onChange={handleImageField}
                            value={imageUrls[i]}
                        />
                    </label>
                </div>
            );
        }
        return imageFields;
    }

    const handleImageField = e => {
        const key= e.target.id.split('-')[2];
        setImageUrls({...imageUrls, [key]: e.target.value });
    }

    const handleAddImageClick = e => {
        setImageFieldCount(imageFieldCount + 1);
        imageUrls[imageFieldCount] = '';
    }

    const handleRemoveImageClick = e => {
        setImageFieldCount(imageFieldCount - 1);
        delete imageUrls[imageFieldCount - 1];
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
        const haunt = {
            id: hauntId,
            name,
            address,
            city,
            state,
            other,
            country,
            latitude,
            longitude,
            rate,
            description,
            imageUrls,
            initialUrlsWithId
        };

        try {
            let updatedHaunt = await dispatch(editHaunt(haunt));
            if (updatedHaunt) {
                // history.push(`/haunts/${updatedHaunt.id}`);
                setShowEditHauntModal(false);
            }
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
            document.getElementById('modal-content').scrollTop = 0;
        }
    }

    return (
        // <div className='form-page' id='add-haunt-form-page'>
            <form
                className='auth-form'
                id='edit-haunt-form'
                onSubmit={handleSubmit}
            >
                <div className={errors.length ? 'haunt-errors-normal' : 'errors-hidden'}>
                    <ul id='haunt-errors-ul'>
                        {errors.map((error, index) => (
                                <li key={index}>
                                    {error}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className='auth-form-title'>
                    Edit Haunt
                </div>
                <div id='edit-haunt-form-fields'>
                    <div id='edit-haunt-form-inner-grid'>
                        <div id='edit-haunt-column-one'>
                            <div className='auth-form-field'>
                                <label htmlFor='name'>
                                    Give your haunt a name:
                                    <input
                                        type='text'
                                        id='name'
                                        name='name'
                                        className='auth-form-input'
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        />
                                </label>
                            </div>
                            <div className='auth-form-field'>
                                <label htmlFor='address'>
                                    Street Address:
                                    <input
                                        type='text'
                                        id='address'
                                        name='address'
                                        className='auth-form-input'
                                        onChange={e => setAddress(e.target.value)}
                                        value={address}
                                        />
                                </label>
                            </div>
                            <div className='auth-form-field'>
                                <label htmlFor='city'>
                                    City:
                                    <input
                                        type='text'
                                        id='city'
                                        name='city'
                                        className='auth-form-input'
                                        onChange={e => setCity(e.target.value)}
                                        value={city}
                                        />
                                </label>
                            </div>
                            <div className='auth-form-field'>
                                <label htmlFor='edit-country'>
                                        Country:
                                        <div className='auth-form-input'>
                                        <select
                                            id='edit-country'
                                            name='country'
                                            className='auth-select'
                                            onChange={e => setCountry(e.target.value)}
                                            value={country}
                                        >
                                            <option value='' disabled>Please select your country...</option>
                                            {countries.map((country, index) => (
                                                <option value={country} key={index}>{country}</option>
                                            ))}
                                        </select>
                                    </div>
                                </label>
                            </div>
                            {showState && (
                                <div className='auth-form-field'>
                                    <label htmlFor='edit-state'>
                                    State:
                                        <div className='auth-form-input'>
                                            <select
                                                id='edit-state'
                                                name='state'
                                                className='auth-select'
                                                onChange={e => setState(e.target.value)}
                                                value={state}
                                            >
                                                <option value='' disabled>Please select your state...</option>
                                                {states.map((state, index) => (
                                                    <option value={state} key={index}>{state}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </label>
                                </div>
                            )}
                            {showOther && (
                                <div className='auth-form-field'>
                                    <label htmlFor='other'>
                                    Other:
                                        <input
                                            type='text'
                                            id='other'
                                            className='auth-form-input'
                                            name='other'
                                            onChange={e => setOther(e.target.value)}
                                            value={other}
                                            placeholder='Please enter country'
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                        <div id='separator-one'></div>
                        <div id='edit-haunt-column-two'>
                            <div className='auth-form-field'>
                                <label htmlFor='latitude'>
                                    Latitude:
                                    <input
                                        type='number'
                                        id='latitude'
                                        name='latitude'
                                        className='auth-form-input'
                                        onChange={e => setLatitude(e.target.value)}
                                        value={latitude}
                                    />
                                </label>
                            </div>
                            <div className='auth-form-field'>
                                <label htmlFor='longitude'>
                                    Longitude:
                                    <input
                                        type='number'
                                        id='longitude'
                                        name='longitude'
                                        className='auth-form-input'
                                        onChange={e => setLongitude(e.target.value)}
                                        value={longitude}
                                        />
                                </label>
                            </div>
                            <div className='auth-form-field'>
                                <label htmlFor='rate'>
                                    Nightly Rate:
                                    <input
                                        type='number'
                                        id='rate'
                                        name='rate'
                                        className='auth-form-input'
                                        onChange={e => setRate(e.target.value)}
                                        value={rate}
                                    />
                                </label>
                            </div>
                            <div className='auth-form-field'>
                                <label htmlFor='description'>
                                    Description:
                                    <textarea
                                        id='description'
                                        name='description'
                                        className='auth-form-input'
                                        onChange={e => setDescription(e.target.value)}
                                        value={description}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id='edit-haunt-images-div'>
                        {generateImageFields(imageFieldCount)}
                        <div id='edit-remove-buttons'>

                            {imageFieldCount < 5 && (
                                <div className='auth-form-field'
                                id='edit-haunt-image-button-area'>
                                    <button
                                        type='button'
                                        className='auth-button'
                                        id='edit-haunt-button'
                                        onClick={handleAddImageClick}
                                    >
                                        Add Image
                                    </button>
                                </div>
                            )}
                            {imageFieldCount > 0 && (
                                <div className='auth-form-field'
                                id='edit-haunt-image-button-area'>
                                    <button
                                        type='button'
                                        className='auth-button'
                                        id='edit-haunt-button'
                                        onClick={handleRemoveImageClick}
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div id='edit-haunt-button-div'>
                    <button
                        type='button'
                        className='auth-button'
                        id='edit-haunt-back'
                        onClick={history.goBack}
                    >
                        Back
                    </button>
                    <button
                        type='submit'
                        id='edit-haunt-submit'
                        className='auth-button'
                    >
                        Submit
                    </button>
                </div>
                </div>
            </form>
        // </div>
    )
};

export default EditHauntForm;
