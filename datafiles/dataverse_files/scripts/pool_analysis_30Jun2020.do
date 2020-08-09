//Do file for analysing the pooling data
//Written by : Charles Agoti
//Date started: 12-Jun-2020

clear
//cd "" //set path to working directory

use pool_data.dta


//start analysis

gen pool_status=0 if pool_ct=="Negative"
replace pool_status=1 if pool_ct!="Negative"

gen test1_ct=pool_ct
replace test1_ct="." if test1_ct=="Negative"
destring test1_ct,replace

gen test2_ct=expand_ct
replace test2_ct="." if (expand_ct=="Negative" | expand_ct=="")
destring test2_ct,replace
replace test2_ct=. if test2_ct>37.0

gen pcr_result=.
replace pcr_result=0 if test2_ct==.
replace pcr_result=1 if test2_ct!=.

//tostring sample_no, replace

save pooled.dta, replace 
by poolnumber, sort: egen minn = min(test2_ct)

gen lowest_ct=.
replace lowest_ct=0 if test1_ct==.
replace lowest_ct=1 if test1_ct!=. & minn==.
replace lowest_ct=2 if test1_ct!=. & minn!=.
replace lowest_ct=3 if test2_ct!=. & float(test2_ct)==min

gen delta_ct=.
replace delta_ct =float(test1_ct)-float(test2_ct) if lowest_ct==3

sum delta_ct if lowest_ct ==3, d

// END

