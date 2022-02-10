import { useState, useEffect } from 'react';
import './AddHauntForm.css';

const AddHauntForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [other, setOther] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [rate, setRate] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showState, setShowState] = useState(false);
    const [showOther, setShowOther] = useState(false);

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

    return (
        <div id='add-haunt-form-container'>
            <div>
                <div id='add-haunt-form-image'>
                    <div id='add-haunt-form-overlay'></div>
                </div>
            </div>
            <div id='add-haunt-form-div'>
                <form id='add-haunt-form'>
                    <div id='add-haunt-form-fields'>
                        <div>
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
                        <div>
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
                        <div>
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
                        <div>
                            <label htmlFor='country'>
                                Country:
                                <select
                                    id='country'
                                    name='country'
                                    onChange={e => setCountry(e.target.value)}
                                    value={country}
                                >
                                    <option value='' disabled>Please select your country...</option>
                                    {countries.map(country=> (
                                        <option value={country}>{country}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div>
                            {showState && (
                                <label htmlFor='state'>
                                State:
                                <select
                                    id='state'
                                    name='state'
                                    onChange={e => setState(e.target.value)}
                                    value={state}
                                    required={showState}
                                >
                                    <option value='' disabled>Please select your state...</option>
                                    {states.map(state=> (
                                        <option value={state}>{state}</option>
                                    ))}
                                </select>
                            </label>
                            )}
                        </div>
                        <div>
                            {showOther && (
                                <label htmlFor='other'>
                                Other:
                                <input
                                    type='text'
                                    id='other'
                                    name='other'
                                    onChange={e => setOther(e.target.value)}
                                    value={other}
                                    required={showOther}
                                    placeholder='Please enter the name of your country'
                                />
                            </label>
                            )}
                        </div>
                        <div>
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
                        <div>
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
                        <div>
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
                        <div>
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
                        <div>
                            <label htmlFor='image-url'>
                                Description:
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
                        <button>
                            Back
                        </button>
                        <button>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default AddHauntForm;
