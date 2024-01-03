<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\State;
use App\Models\City;

class StateCitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statesAndCities = [
            ['Andhra Pradesh' => ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Kakinada', 'Rajahmundry', 'Tirupati', 'Kadapa', 'Anantapur']],
            ['Arunachal Pradesh' => ['Itanagar', 'Naharlagun', 'Pasighat', 'Roing', 'Tezu', 'Namsai', 'Ziro', 'Bomdila']],
            ['Assam' => ['Guwahati', 'Dibrugarh', 'Jorhat', 'Silchar', 'Nagaon', 'Tezpur', 'Tinsukia', 'Sivasagar', 'Kokrajhar', 'Bongaigaon']],
            ['Bihar' => ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Arrah', 'Bihar Sharif', 'Chapra', 'Purnia', 'Motihari']],
            ['Chhattisgarh' => ['Raipur', 'Bilaspur', 'Bhilai', 'Korba', 'Durg', 'Raigarh', 'Ambikapur', 'Rajnandgaon']],
            ['Goa' => ['Panaji', 'Vasco da Gama', 'Margao', 'Mapusa', 'Ponda', 'Mormugao', 'Curchorem', 'Sanquelim']],
            ['Gujarat' => ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh', 'Anand', 'Gandhinagar', 'Bharuch']],
            ['Haryana' => ['Chandigarh', 'Faridabad', 'Gurgaon', 'Hisar', 'Rohtak', 'Panipat', 'Ambala', 'Yamunanagar']],
            ['Himachal Pradesh' => ['Shimla', 'Manali', 'Dharamshala', 'Solan', 'Kullu', 'Mandi', 'Palampur', 'Nahan']],
            ['Jharkhand' => ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro Steel City', 'Deoghar', 'Hazaribagh', 'Giridih', 'Ramgarh']],
            ['Karnataka' => ['Bangalore', 'Mysuru', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga', 'Davanagere', 'Bellary', 'Bijapur', 'Shimoga']],
            ['Kerala' => ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Alappuzha', 'Kannur']],
            ['Madhya Pradesh' => ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna']],
            ['Maharashtra' => ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Kalyan-Dombivli', 'Vasai-Virar', 'Aurangabad', 'Solapur', 'Navi Mumbai']],
            ['Manipur' => ['Imphal', 'Thoubal', 'Kakching', 'Churachandpur', 'Bishnupur', 'Senapati', 'Ukhrul']],
            ['Meghalaya' => ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Williamnagar', 'Baghmara', 'Resubelpara']],
            ['Mizoram' => ['Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Serchhip', 'Kolasib', 'Lawngtlai']],
            ['Nagaland' => ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Zunheboto', 'Mon', 'Phek']],
            ['Odisha' => ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Sambalpur', 'Puri', 'Brahmapur', 'Jharsuguda', 'Bhadrak']],
            ['Punjab' => ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Hoshiarpur', 'Mohali']],
            ['Rajasthan' => ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Sikar']],
            ['Sikkim' => ['Gangtok', 'Namchi', 'Mangan', 'Geyzing', 'Singtam', 'Jorethang', 'Rangpo', 'Ravangla']],
            ['Tamil Nadu' => ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore', 'Tiruppur']],
            ['Telangana' => ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Ramagundam', 'Khammam', 'Mahbubnagar', 'Nalgonda']],
            ['Tripura' => ['Agartala', 'Udaipur', 'Dharmanagar', 'Belonia', 'Kailashahar', 'Ambassa', 'Khowai', 'Sonamura']],
            ['Uttar Pradesh' => ['Lucknow', 'Kanpur', 'Agra', 'Meerut', 'Varanasi', 'Allahabad', 'Ghaziabad', 'Noida']],
            ['Uttarakhand' => ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh']],
            ['West Bengal' => ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda', 'Kharagpur']],
        ];

        foreach ($statesAndCities as $stateData) {
            $stateName = key($stateData);
            $state = State::create(['state_name' => $stateName]);

            $cities = reset($stateData);
            foreach ($cities as $city) {
                City::create(['state_id' => $state->id, 'cities' => $city]);
            }
        };
    }

}
