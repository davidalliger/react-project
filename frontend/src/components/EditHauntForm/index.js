import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHaunt } from '../../store/haunts';
import { useHistory, useParams } from 'react-router-dom';
import '../AddHauntForm/AddHauntForm.css'

const EditHauntForm = () => {
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
    const { hauntId } = useParams();
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
    const [imageUrl, setImageUrl] = useState(haunt.Images.length ? haunt.Images[0].url : '');
    const [showState, setShowState] = useState(haunt.country === 'United States');
    const [showOther, setShowOther] = useState(!(countries.includes(haunt.country)));
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

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
    }, [sessionUser]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
        const haunt = {
            userId: sessionUser.id,
            name,
            address,
            city,
            state,
            other,
            country,
            latitude,
            longitude,
            rate,
            description
        };
        try {
            let newHaunt = await dispatch(createHaunt(haunt));
            if (newHaunt) {
                history.push(`/haunts/${newHaunt.id}`);
            }
        } catch (err) {
            let resBody = await err.json();
            setErrors(resBody.errors);
        }
    }

    return (
        <div id='add-haunt-form-container'>
            <div>
                <div id='add-haunt-form-image'>
                    <div id='add-haunt-form-overlay'></div>
                </div>
            </div>
            <div id='add-haunt-form-div'>
                <div className={errors.length ? 'haunt-errors-normal' : 'errors-hidden'}>
                    <ul id='haunt-errors-ul'>
                        {errors.map((error, index) => (
                                <li key={index}>
                                    {error}
                                </li>
                            ))}
                    </ul>
                </div>
                <form
                    className='auth-form'
                    id='add-haunt-form'
                    onSubmit={handleSubmit}
                >
                    <div id='add-haunt-form-fields'>
                        <div className='auth-form-field'>
                            <label htmlFor='name'>
                                Give your haunt a name:
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
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
                                    onChange={e => setCity(e.target.value)}
                                    value={city}
                                    />
                            </label>
                        </div>
                        <div className='auth-form-field'>
                            <label htmlFor='country'>
                                Country:
                                <select
                                    id='country'
                                    name='country'
                                    onChange={e => setCountry(e.target.value)}
                                    value={country}
                                >
                                    <option value='' disabled>Please select your country...</option>
                                    {countries.map((country, index) => (
                                        <option value={country} key={index}>{country}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className='auth-form-field'>
                            {showState && (
                                <label htmlFor='state'>
                                State:
                                <select
                                    id='state'
                                    name='state'
                                    onChange={e => setState(e.target.value)}
                                    value={state}
                                    // required={showState}
                                >
                                    <option value='' disabled>Please select your state...</option>
                                    {states.map((state, index) => (
                                        <option value={state} key={index}>{state}</option>
                                    ))}
                                </select>
                            </label>
                            )}
                        </div>
                        <div className='auth-form-field'>
                            {showOther && (
                                <label htmlFor='other'>
                                Other:
                                <input
                                    type='text'
                                    id='other'
                                    name='other'
                                    onChange={e => setOther(e.target.value)}
                                    value={other}
                                    // required={showOther}
                                    placeholder='Please enter the name of your country'
                                />
                            </label>
                            )}
                        </div>
                        <div className='auth-form-field'>
                            <label htmlFor='latitude'>
                                Latitude:
                                <input
                                    type='number'
                                    id='latitude'
                                    name='latitude'
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
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                />
                            </label>
                        </div>
                        <div className='auth-form-field'>
                            <label htmlFor='image-url'>
                                Image URL:
                                <textarea
                                    id='image-url'
                                    name='imageUrl'
                                    onChange={e => setImageUrl(e.target.value)}
                                    value={imageUrl}
                                />
                            </label>
                        </div>
                    </div>
                    <div id='add-haunt-form-footer'>
                        <button
                        type='button'
                        >
                            Back
                        </button>
                        <button
                        type='submit'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default EditHauntForm;
