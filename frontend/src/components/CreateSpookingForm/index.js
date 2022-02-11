import './CreateSpookingForm.css'

const CreateSpookingForm = ({haunt}) => {
    return (
        <div id='create-spooking-form'>
            <div id='create-spooking-form-heading'>
                <div id='create-spooking-form-rate'>
                    <h2>
                        ${Math.round(haunt.rate)}
                    </h2>
                    <div id='create-spooking-form-per-night'>
                        / night
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateSpookingForm;
