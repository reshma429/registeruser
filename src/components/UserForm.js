import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
//import * as yup from "yup";
import { registerSchema } from '../Validations/formSchema';
import Axios from 'axios';



const UserForm = () => {




    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) });


    const onSubmit = (data) => {
        console.log(data)
       

        Axios.post('http://localhost:4000/insert',data).then((response)=>{console.log(response);});
        

    };
    const handleCancel = () => {
        document.getElementById("registration-form").reset();
    }
    return (
        <div>
            <form className="row g-3" onSubmit={handleSubmit(onSubmit)} id="registration-form">
                <h5>Personal Details</h5>
                <div className="col-md-5">
                    <label htmlFor="inputfullName" className="form-label">Name</label>
                    <input name="fullName" type="text" className="form-control" id="inputfullName" placeholder='Enter Name' {...register("fullName")} />
                    {errors.fullName ? (
                        <span className="text-danger">{errors.fullName.message}</span>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputAge" className="form-label">Date of Birth or Age</label>
                    <input name="Age" type="text" className="form-control" id="inputAge" placeholder='DD/MM/YY or Age in Years'  {...register("Age")} />
                    {errors.Age ? (
                        <span className="text-danger">{errors.Age.message}</span>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="col-md-3">
                    <label htmlFor="inputSex" className="form-label">Sex</label>
                    <select name="Sex" className="form-select form-control" id='inputSex'  {...register("Sex")} >
                        <option disabled selected value="">Enter Sex</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>

                    </select>
                    {errors.Sex ? (
                        <span className="text-danger">{errors.Sex.message}</span>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="col-md-5">
                    <label htmlFor="inputMobile" className="form-label">Mobile</label>
                    <input name="Mobile" type="number" className="form-control" id="inputMobile" placeholder="Enter Mobile" {...register("Mobile")} />
                    {errors.Mobile ? (
                        <span className="text-danger">{errors.Mobile.message}</span>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="col-md-3">
                    <label htmlFor="inputIdType" className="form-label">Govt Issued Id</label>
                    <select name="IdType" className="form-select form-control" id='inputIdType' placeholder='ID Type'  {...register("IdType")} >
                        <option disabled selected value="">ID Type</option>
                        <option value="Aadhar">Aadhar</option>
                        <option value="PAN">PAN</option>
                    </select>
                    {errors.IdType ? (
                        <span className="text-danger">{errors.IdType.message}</span>
                    ) : (
                        <></>
                    )}

                </div>


                <div className="col-md-3">
                    <label htmlFor="inputGovtId" className="form-label"></label>
                    <input name="GovtId" type="text" className="form-control mt-2" id='inputGovtId' placeholder='Enter Govt Id'  {...register("GovtId")} />
                    {errors.GovtId ? (
                        <span className="text-danger">{errors.GovtId.message}</span>
                    ) : (
                        <></>
                    )}

                </div>




                <h5>Contact Details</h5>

                <div className="col-md-2">
                    <label htmlFor="inputguardianLabel" className="form-label">Guardian Details</label>
                    <select name="guardianLabel" className="form-select form-control" id='inputguardianLabel' placeholder='Enter Label'  {...register("guardianLabel")} >
                        <option disabled selected value="">Enter Label</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                    </select>
                  

                </div>


                <div className="col-md-3">
                    <label htmlFor="inputguardian" className="form-label"></label>
                    <input name="guardian" type="text" className="form-control mt-2" id='inputguardian' placeholder='Enter Guardian Name'  {...register("guardian")} />
                    {errors.guardian ? (
                        <span className="text-danger">{errors.guardian.message}</span>
                    ) : (
                        <></>
                    )}
                </div>



                <div className="col-md-4">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input name="Email" type="Email" className="form-control" placeholder='Enter Email' {...register("Email")} />

                </div>
                <div className="col-md-3">
                    <label htmlFor="inputEmergencyNo" className="form-label">Emergency Contact Number</label>
                    <input name="EmergencyNo" type="number" className="form-control" id="inputEmergencyNumber" placeholder='Enter Emergency Number' {...register("EmergencyNo")} />
                    {errors.EmergencyNo ? (
                        <span className="text-danger">{errors.EmergencyNo.message}</span>
                    ) : (
                        <></>
                    )}
                </div>
                <h5>Address Details</h5>
                <div className="col-md-4">

                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input name="Address" type="text" className="form-control" placeholder='Enter Address'  {...register("Address")} />

                </div>
                <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label">State</label>
                    <Select
                        name={"State"}
                        className='form-control'
                        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                        getOptionLabel={(options) => {
                            return options["name"];
                        }}
                        getOptionValue={(options) => {
                            return options["name"];
                        }}
                        value={selectedState}
                        onChange={(item) => {
                            setSelectedState(item);
                        }}


                    />

                </div>
                <div className="col-md-4">
                    <label htmlFor="inputCity" className="form-label">City</label>
                    <Select name={"City"}
                        className='form-control'
                        options={City.getCitiesOfState(
                            selectedState?.countryCode,
                            selectedState?.isoCode
                        )}
                        getOptionLabel={(options) => {
                            return options["name"];
                        }}
                        getOptionValue={(options) => {
                            return options["name"];
                        }}
                        value={selectedCity}
                        onChange={(item) => {
                            setSelectedCity(item);
                        }}

                    />
                </div>
                <div className="col-md-5">
                    <label htmlFor="inputCountry" className="form-label">Country</label>
                    <Select name={'Country'}
                        className='form-control'
                        options={Country.getAllCountries()}
                        getOptionLabel={(options) => {
                            return options["name"];
                        }}
                        getOptionValue={(options) => {
                            return options["name"];
                        }}

                        value={selectedCountry}

                        onChange={(item) => {
                            setSelectedCountry(item);
                        }}

                    />
                </div>

                <div className="col-md-4">
                    <label htmlFor="inputPincode" className="form-label">Pincode</label>
                    <input name="Pincode" type="number" className="form-control" placeholder='Enter Pincode'  {...register("Pincode")} />

                </div>
                <h5>Other Details</h5>
                <div className="col-md-3">

                    <label htmlFor="inputOccupation" className="form-label">Occupation</label>
                    <input name="Occupation" type="text" className="form-control" placeholder='Enter Occupation'  {...register("Occupation")} />

                </div>
                <div className="col-md-3">
                    <label htmlFor="inputReligion" className="form-label">Religion</label>
                    <select name="Religion" className="form-select" {...register("Religion")}>
                        <option selected value="" disabled>Enter Religion</option>

                        <option value="Christianity">Christianity</option>
                        <option value="Islam">Islam</option>
                        <option value="Hinduism">Hinduism</option>
                        <option value="Buddhism">Buddhism</option>
                        <option value="Sikhism">Sikhism</option>
                        <option value="Judaism">Judaism</option>
                        <option value="Jainism">Jainism</option>
                        <option value="Shinto">Shinto</option>
                        <option value="Zoroastrianism">Zoroastrianism</option>
                        <option value="Spiritism">Spiritism</option>
                        <option value="Secular/Nonreligious/Agnostic/Atheist">Secular/Nonreligious/Agnostic/Atheist</option>


                    </select>
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputMaritalStatus" className="form-label">Marital Status</label>
                    <select name="Marital Status" className="form-select" {...register("Marital Status")}>
                        <option defaultValue>Enter Marital Status</option>
                        <option value="1">Married</option>
                        <option value="2">Unmariied</option>

                    </select>
                </div>
                <div className="col-md-3">
                    <label htmlFor="inputBloodGroup" className="form-label">Blood Group</label>
                    <select name="Blood Group" className="form-select"  {...register("Blood Group")}>
                        <option defaultValue>Group</option>
                        <option value="1">A+</option>
                        <option value="2">A-</option>
                        <option value="3">B+</option>
                        <option value="4">B-</option>
                        <option value="5">AB+</option>
                        <option value="6">AB-</option>
                        <option value="7">O+</option>
                        <option value="8">O-</option>
                        <option value="9">ABO</option>
                        <option value="10">Rh</option>


                    </select>
                </div>

                <div className="col-md-5">
                    <label htmlFor="inputNationality" className="form-label">Nationality</label>
                    <select name="Nationality" className="form-select"  {...register("Nationality")}>
                        <option defaultValue value="Indian">Indian</option>
                        <option value="">-- select one --</option>
                        <option value="afghan">Afghan</option>
                        <option value="albanian">Albanian</option>
                        <option value="algerian">Algerian</option>
                        <option value="american">American</option>
                        <option value="andorran">Andorran</option>
                        <option value="angolan">Angolan</option>
                        <option value="antiguans">Antiguans</option>
                        <option value="argentinean">Argentinean</option>
                        <option value="armenian">Armenian</option>
                        <option value="australian">Australian</option>
                        <option value="austrian">Austrian</option>
                        <option value="azerbaijani">Azerbaijani</option>
                        <option value="bahamian">Bahamian</option>
                        <option value="bahraini">Bahraini</option>
                        <option value="bangladeshi">Bangladeshi</option>
                        <option value="barbadian">Barbadian</option>
                        <option value="barbudans">Barbudans</option>
                        <option value="batswana">Batswana</option>
                        <option value="belarusian">Belarusian</option>
                        <option value="belgian">Belgian</option>
                        <option value="belizean">Belizean</option>
                        <option value="beninese">Beninese</option>
                        <option value="bhutanese">Bhutanese</option>
                        <option value="bolivian">Bolivian</option>
                        <option value="bosnian">Bosnian</option>
                        <option value="brazilian">Brazilian</option>
                        <option value="british">British</option>
                        <option value="bruneian">Bruneian</option>
                        <option value="bulgarian">Bulgarian</option>
                        <option value="burkinabe">Burkinabe</option>
                        <option value="burmese">Burmese</option>
                        <option value="burundian">Burundian</option>
                        <option value="cambodian">Cambodian</option>
                        <option value="cameroonian">Cameroonian</option>
                        <option value="canadian">Canadian</option>
                        <option value="cape verdean">Cape Verdean</option>
                        <option value="central african">Central African</option>
                        <option value="chadian">Chadian</option>
                        <option value="chilean">Chilean</option>
                        <option value="chinese">Chinese</option>
                        <option value="colombian">Colombian</option>
                        <option value="comoran">Comoran</option>
                        <option value="congolese">Congolese</option>
                        <option value="costa rican">Costa Rican</option>
                        <option value="croatian">Croatian</option>
                        <option value="cuban">Cuban</option>
                        <option value="cypriot">Cypriot</option>
                        <option value="czech">Czech</option>
                        <option value="danish">Danish</option>
                        <option value="djibouti">Djibouti</option>
                        <option value="dominican">Dominican</option>
                        <option value="dutch">Dutch</option>
                        <option value="east timorese">East Timorese</option>
                        <option value="ecuadorean">Ecuadorean</option>
                        <option value="egyptian">Egyptian</option>
                        <option value="emirian">Emirian</option>
                        <option value="equatorial guinean">Equatorial Guinean</option>
                        <option value="eritrean">Eritrean</option>
                        <option value="estonian">Estonian</option>
                        <option value="ethiopian">Ethiopian</option>
                        <option value="fijian">Fijian</option>
                        <option value="filipino">Filipino</option>
                        <option value="finnish">Finnish</option>
                        <option value="french">French</option>
                        <option value="gabonese">Gabonese</option>
                        <option value="gambian">Gambian</option>
                        <option value="georgian">Georgian</option>
                        <option value="german">German</option>
                        <option value="ghanaian">Ghanaian</option>
                        <option value="greek">Greek</option>
                        <option value="grenadian">Grenadian</option>
                        <option value="guatemalan">Guatemalan</option>
                        <option value="guinea-bissauan">Guinea-Bissauan</option>
                        <option value="guinean">Guinean</option>
                        <option value="guyanese">Guyanese</option>
                        <option value="haitian">Haitian</option>
                        <option value="herzegovinian">Herzegovinian</option>
                        <option value="honduran">Honduran</option>
                        <option value="hungarian">Hungarian</option>
                        <option value="icelander">Icelander</option>
                        <option value="indian">Indian</option>
                        <option value="indonesian">Indonesian</option>
                        <option value="iranian">Iranian</option>
                        <option value="iraqi">Iraqi</option>
                        <option value="irish">Irish</option>
                        <option value="israeli">Israeli</option>
                        <option value="italian">Italian</option>
                        <option value="ivorian">Ivorian</option>
                        <option value="jamaican">Jamaican</option>
                        <option value="japanese">Japanese</option>
                        <option value="jordanian">Jordanian</option>
                        <option value="kazakhstani">Kazakhstani</option>
                        <option value="kenyan">Kenyan</option>
                        <option value="kittian and nevisian">Kittian and Nevisian</option>
                        <option value="kuwaiti">Kuwaiti</option>
                        <option value="kyrgyz">Kyrgyz</option>
                        <option value="laotian">Laotian</option>
                        <option value="latvian">Latvian</option>
                        <option value="lebanese">Lebanese</option>
                        <option value="liberian">Liberian</option>
                        <option value="libyan">Libyan</option>
                        <option value="liechtensteiner">Liechtensteiner</option>
                        <option value="lithuanian">Lithuanian</option>
                        <option value="luxembourger">Luxembourger</option>
                        <option value="macedonian">Macedonian</option>
                        <option value="malagasy">Malagasy</option>
                        <option value="malawian">Malawian</option>
                        <option value="malaysian">Malaysian</option>
                        <option value="maldivan">Maldivan</option>
                        <option value="malian">Malian</option>
                        <option value="maltese">Maltese</option>
                        <option value="marshallese">Marshallese</option>
                        <option value="mauritanian">Mauritanian</option>
                        <option value="mauritian">Mauritian</option>
                        <option value="mexican">Mexican</option>
                        <option value="micronesian">Micronesian</option>
                        <option value="moldovan">Moldovan</option>
                        <option value="monacan">Monacan</option>
                        <option value="mongolian">Mongolian</option>
                        <option value="moroccan">Moroccan</option>
                        <option value="mosotho">Mosotho</option>
                        <option value="motswana">Motswana</option>
                        <option value="mozambican">Mozambican</option>
                        <option value="namibian">Namibian</option>
                        <option value="nauruan">Nauruan</option>
                        <option value="nepalese">Nepalese</option>
                        <option value="new zealander">New Zealander</option>
                        <option value="ni-vanuatu">Ni-Vanuatu</option>
                        <option value="nicaraguan">Nicaraguan</option>
                        <option value="nigerien">Nigerien</option>
                        <option value="north korean">North Korean</option>
                        <option value="northern irish">Northern Irish</option>
                        <option value="norwegian">Norwegian</option>
                        <option value="omani">Omani</option>
                        <option value="pakistani">Pakistani</option>
                        <option value="palauan">Palauan</option>
                        <option value="panamanian">Panamanian</option>
                        <option value="papua new guinean">Papua New Guinean</option>
                        <option value="paraguayan">Paraguayan</option>
                        <option value="peruvian">Peruvian</option>
                        <option value="polish">Polish</option>
                        <option value="portuguese">Portuguese</option>
                        <option value="qatari">Qatari</option>
                        <option value="romanian">Romanian</option>
                        <option value="russian">Russian</option>
                        <option value="rwandan">Rwandan</option>
                        <option value="saint lucian">Saint Lucian</option>
                        <option value="salvadoran">Salvadoran</option>
                        <option value="samoan">Samoan</option>
                        <option value="san marinese">San Marinese</option>
                        <option value="sao tomean">Sao Tomean</option>
                        <option value="saudi">Saudi</option>
                        <option value="scottish">Scottish</option>
                        <option value="senegalese">Senegalese</option>
                        <option value="serbian">Serbian</option>
                        <option value="seychellois">Seychellois</option>
                        <option value="sierra leonean">Sierra Leonean</option>
                        <option value="singaporean">Singaporean</option>
                        <option value="slovakian">Slovakian</option>
                        <option value="slovenian">Slovenian</option>
                        <option value="solomon islander">Solomon Islander</option>
                        <option value="somali">Somali</option>
                        <option value="south african">South African</option>
                        <option value="south korean">South Korean</option>
                        <option value="spanish">Spanish</option>
                        <option value="sri lankan">Sri Lankan</option>
                        <option value="sudanese">Sudanese</option>
                        <option value="surinamer">Surinamer</option>
                        <option value="swazi">Swazi</option>
                        <option value="swedish">Swedish</option>
                        <option value="swiss">Swiss</option>
                        <option value="syrian">Syrian</option>
                        <option value="taiwanese">Taiwanese</option>
                        <option value="tajik">Tajik</option>
                        <option value="tanzanian">Tanzanian</option>
                        <option value="thai">Thai</option>
                        <option value="togolese">Togolese</option>
                        <option value="tongan">Tongan</option>
                        <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                        <option value="tunisian">Tunisian</option>
                        <option value="turkish">Turkish</option>
                        <option value="tuvaluan">Tuvaluan</option>
                        <option value="ugandan">Ugandan</option>
                        <option value="ukrainian">Ukrainian</option>
                        <option value="uruguayan">Uruguayan</option>
                        <option value="uzbekistani">Uzbekistani</option>
                        <option value="venezuelan">Venezuelan</option>
                        <option value="vietnamese">Vietnamese</option>
                        <option value="welsh">Welsh</option>
                        <option value="yemenite">Yemenite</option>
                        <option value="zambian">Zambian</option>
                        <option value="zimbabwean">Zimbabwean</option>


                    </select>
                </div>
                <div className='d-flex justify-content-end p-3 g-3'>

                    <button type="button" className="btn btn-danger mx-3" onClick={handleCancel}>Cancel</button>


                    <button type="submit" className="btn btn-primary mx-3">Submit</button>

                </div>
            </form>
        </div>
    )
}

export default UserForm
