import "./App.css";
import "bulma/css/bulma.min.css";
import {
  Container,
  Box,
  Form,
  Icon,
  Heading,
  Block,
  Tag,
  Content,
} from "react-bulma-components";
import { useState } from "react";

const regexNumeric = new RegExp(/^0|[1-9]\d*(\.\d+)?$/);

function App() {
  const [currencyA, setCurrencyA] = useState("USD");
  const [currencyB, setCurrencyB] = useState("AFN");
  const [inputA, setInputA] = useState("");
  const [inputB, setInputB] = useState("");
  const [currencyData, setCurrencyData] = useState(null);

  const [fetching, setFetching] = useState(false);

  function onChangeA(e){
    setInputA(e.target.value);
    convertCurrency(currencyA, currencyB, e.target.value, setInputB, currencyData);
  }

  function onChangeB(e){
    setInputB(e.target.value);
    convertCurrency(currencyB, currencyA, e.target.value, setInputA, currencyData);
  }

  function convertCurrency(currencyA, currencyB, amount, setter, data){
    if(!data){
      fetchCurrencyData(convertCurrency.bind(null, currencyA, currencyB, amount, setter));
      return 0;
    }

    let converted = amount / data[currencyA] * data[currencyB];
    setter(""+converted+"");
  }

  function reverse(){
    let a = inputA;
    let b = inputB;
    let currb = currencyB;
    let curra = currencyA;
    setInputB(a);
    setInputA(b);
    setCurrencyA(currb);
    setCurrencyB(curra);

    convertCurrency(currb, curra, b, setInputB, currencyData);

  }

  function isNumeric(str){
    return regexNumeric.test(str);
  }

  async function fetchCurrencyData(callback){
    if(currencyData) return;
    if(fetching) return;
    let res;
    try{
      setFetching(true);
      res = await fetch('https://freecurrencyapi.net/api/v2/latest?apikey=b4923320-2214-11ec-a96b-c7b5a83391bb');
      res = await res.json();
      res.data['USD'] = 1;
      setCurrencyData(res.data);
      callback.bind(null, res.data)();
    }catch(err){
      setFetching(false);
      setTimeout(fetchCurrencyData, 1000);
    }
    setFetching(false);
  }

  return (
    <Container pt="6" px="0" breakpoint="fullhd">
      <Container>
        <Heading textAlign="center" style={{ color: '#6a6a6a' }}>
          Currency Converter
        </Heading>
      </Container>

      <Container
        pt="5"
        mt="6"
        breakpoint="fullhd"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <Heading subtitle textAlign="center" size="6">
          Sick currency converter the world has ever created. A total
          breakthrough.
        </Heading>

        <Container display="flex" justifyContent="center" mt="5">
          <Block ml="3">
            <Tag color="success">CERTIFIED BADASS</Tag>
          </Block>

          <Block ml="3">
            <Tag color="success">TOTAL SICK</Tag>
          </Block>

          <Block ml="3">
            <Tag color="warning">TRIPLE A</Tag>
          </Block>
        </Container>
      </Container>

      {fetching && (
        <Content textAlign='center' my='3'>
          <p><i>Fetching currency data...</i></p>
        </Content>
      )}
      <Box
        style={{
          width: "300px",
          border: "1px solid #dce0f4",
        }}
        mx="auto"
        mt="5"
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <form action="" style={{ textAlign: "center" }}>
          <Form.Field kind="" mb="5">
            <Form.Control fullwidth>
              <Form.Input textAlign="right" placeholder="0.00" value={inputA} onChange={onChangeA}/>
            </Form.Control>

            <Form.Control>
              <Form.Select
                value={currencyA}
                onChange={(e) => {setCurrencyA(e.target.value)}}
              >
                <option value="AFN">AFN - Afghan Afghani - ؋</option>
                <option value="ALL">ALL - Albanian Lek - Lek</option>
                <option value="DZD">DZD - Algerian Dinar - دج</option>
                <option value="AOA">AOA - Angolan Kwanza - Kz</option>
                <option value="ARS">ARS - Argentine Peso - $</option>
                <option value="AMD">AMD - Armenian Dram - ֏</option>
                <option value="AWG">AWG - Aruban Florin - ƒ</option>
                <option value="AUD">AUD - Australian Dollar - $</option>
                <option value="AZN">AZN - Azerbaijani Manat - m</option>
                <option value="BSD">BSD - Bahamian Dollar - B$</option>
                <option value="BHD">BHD - Bahraini Dinar - .د.ب</option>
                <option value="BDT">BDT - Bangladeshi Taka - ৳</option>
                <option value="BBD">BBD - Barbadian Dollar - Bds$</option>
                <option value="BYR">BYR - Belarusian Ruble - Br</option>
                <option value="BEF">BEF - Belgian Franc - fr</option>
                <option value="BZD">BZD - Belize Dollar - $</option>
                <option value="BMD">BMD - Bermudan Dollar - $</option>
                <option value="BTN">BTN - Bhutanese Ngultrum - Nu.</option>
                <option value="BTC">BTC - Bitcoin - ฿</option>
                <option value="BOB">BOB - Bolivian Boliviano - Bs.</option>
                <option value="BAM">
                  BAM - Bosnia-Herzegovina Convertible Mark - KM
                </option>
                <option value="BWP">BWP - Botswanan Pula - P</option>
                <option value="BRL">BRL - Brazilian Real - R$</option>
                <option value="GBP">GBP - British Pound Sterling - £</option>
                <option value="BND">BND - Brunei Dollar - B$</option>
                <option value="BGN">BGN - Bulgarian Lev - Лв.</option>
                <option value="BIF">BIF - Burundian Franc - FBu</option>
                <option value="KHR">KHR - Cambodian Riel - KHR</option>
                <option value="CAD">CAD - Canadian Dollar - $</option>
                <option value="CVE">CVE - Cape Verdean Escudo - $</option>
                <option value="KYD">KYD - Cayman Islands Dollar - $</option>
                <option value="XOF">XOF - CFA Franc BCEAO - CFA</option>
                <option value="XAF">XAF - CFA Franc BEAC - FCFA</option>
                <option value="XPF">XPF - CFP Franc - ₣</option>
                <option value="CLP">CLP - Chilean Peso - $</option>
                <option value="CNY">CNY - Chinese Yuan - ¥</option>
                <option value="COP">COP - Colombian Peso - $</option>
                <option value="KMF">KMF - Comorian Franc - CF</option>
                <option value="CDF">CDF - Congolese Franc - FC</option>
                <option value="CRC">CRC - Costa Rican ColÃ³n - ₡</option>
                <option value="HRK">HRK - Croatian Kuna - kn</option>
                <option value="CUC">
                  CUC - Cuban Convertible Peso - $, CUC
                </option>
                <option value="CZK">CZK - Czech Republic Koruna - Kč</option>
                <option value="DKK">DKK - Danish Krone - Kr.</option>
                <option value="DJF">DJF - Djiboutian Franc - Fdj</option>
                <option value="DOP">DOP - Dominican Peso - $</option>
                <option value="XCD">XCD - East Caribbean Dollar - $</option>
                <option value="EGP">EGP - Egyptian Pound - ج.م</option>
                <option value="ERN">ERN - Eritrean Nakfa - Nfk</option>
                <option value="EEK">EEK - Estonian Kroon - kr</option>
                <option value="ETB">ETB - Ethiopian Birr - Nkf</option>
                <option value="EUR">EUR - Euro - €</option>
                <option value="FKP">FKP - Falkland Islands Pound - £</option>
                <option value="FJD">FJD - Fijian Dollar - FJ$</option>
                <option value="GMD">GMD - Gambian Dalasi - D</option>
                <option value="GEL">GEL - Georgian Lari - ლ</option>
                <option value="DEM">DEM - German Mark - DM</option>
                <option value="GHS">GHS - Ghanaian Cedi - GH₵</option>
                <option value="GIP">GIP - Gibraltar Pound - £</option>
                <option value="GRD">GRD - Greek Drachma - ₯, Δρχ, Δρ</option>
                <option value="GTQ">GTQ - Guatemalan Quetzal - Q</option>
                <option value="GNF">GNF - Guinean Franc - FG</option>
                <option value="GYD">GYD - Guyanaese Dollar - $</option>
                <option value="HTG">HTG - Haitian Gourde - G</option>
                <option value="HNL">HNL - Honduran Lempira - L</option>
                <option value="HKD">HKD - Hong Kong Dollar - $</option>
                <option value="HUF">HUF - Hungarian Forint - Ft</option>
                <option value="ISK">ISK - Icelandic KrÃ³na - kr</option>
                <option value="INR">INR - Indian Rupee - ₹</option>
                <option value="IDR">IDR - Indonesian Rupiah - Rp</option>
                <option value="IRR">IRR - Iranian Rial - ﷼</option>
                <option value="IQD">IQD - Iraqi Dinar - د.ع</option>
                <option value="ILS">ILS - Israeli New Sheqel - ₪</option>
                <option value="ITL">ITL - Italian Lira - L,£</option>
                <option value="JMD">JMD - Jamaican Dollar - J$</option>
                <option value="JPY">JPY - Japanese Yen - ¥</option>
                <option value="JOD">JOD - Jordanian Dinar - ا.د</option>
                <option value="KZT">KZT - Kazakhstani Tenge - лв</option>
                <option value="KES">KES - Kenyan Shilling - KSh</option>
                <option value="KWD">KWD - Kuwaiti Dinar - ك.د</option>
                <option value="KGS">KGS - Kyrgystani Som - лв</option>
                <option value="LAK">LAK - Laotian Kip - ₭</option>
                <option value="LVL">LVL - Latvian Lats - Ls</option>
                <option value="LBP">LBP - Lebanese Pound - £</option>
                <option value="LSL">LSL - Lesotho Loti - L</option>
                <option value="LRD">LRD - Liberian Dollar - $</option>
                <option value="LYD">LYD - Libyan Dinar - د.ل</option>
                <option value="LTL">LTL - Lithuanian Litas - Lt</option>
                <option value="MOP">MOP - Macanese Pataca - $</option>
                <option value="MKD">MKD - Macedonian Denar - ден</option>
                <option value="MGA">MGA - Malagasy Ariary - Ar</option>
                <option value="MWK">MWK - Malawian Kwacha - MK</option>
                <option value="MYR">MYR - Malaysian Ringgit - RM</option>
                <option value="MVR">MVR - Maldivian Rufiyaa - Rf</option>
                <option value="MRO">MRO - Mauritanian Ouguiya - MRU</option>
                <option value="MUR">MUR - Mauritian Rupee - ₨</option>
                <option value="MXN">MXN - Mexican Peso - $</option>
                <option value="MDL">MDL - Moldovan Leu - L</option>
                <option value="MNT">MNT - Mongolian Tugrik - ₮</option>
                <option value="MAD">MAD - Moroccan Dirham - MAD</option>
                <option value="MZM">MZM - Mozambican Metical - MT</option>
                <option value="MMK">MMK - Myanmar Kyat - K</option>
                <option value="NAD">NAD - Namibian Dollar - $</option>
                <option value="NPR">NPR - Nepalese Rupee - ₨</option>
                <option value="ANG">
                  ANG - Netherlands Antillean Guilder - ƒ
                </option>
                <option value="TWD">TWD - New Taiwan Dollar - $</option>
                <option value="NZD">NZD - New Zealand Dollar - $</option>
                <option value="NIO">NIO - Nicaraguan CÃ³rdoba - C$</option>
                <option value="NGN">NGN - Nigerian Naira - ₦</option>
                <option value="KPW">KPW - North Korean Won - ₩</option>
                <option value="NOK">NOK - Norwegian Krone - kr</option>
                <option value="OMR">OMR - Omani Rial - .ع.ر</option>
                <option value="PKR">PKR - Pakistani Rupee - ₨</option>
                <option value="PAB">PAB - Panamanian Balboa - B/.</option>
                <option value="PGK">PGK - Papua New Guinean Kina - K</option>
                <option value="PYG">PYG - Paraguayan Guarani - ₲</option>
                <option value="PEN">PEN - Peruvian Nuevo Sol - S/.</option>
                <option value="PHP">PHP - Philippine Peso - ₱</option>
                <option value="PLN">PLN - Polish Zloty - zł</option>
                <option value="QAR">QAR - Qatari Rial - ق.ر</option>
                <option value="RON">RON - Romanian Leu - lei</option>
                <option value="RUB">RUB - Russian Ruble - ₽</option>
                <option value="RWF">RWF - Rwandan Franc - FRw</option>
                <option value="SVC">SVC - Salvadoran ColÃ³n - ₡</option>
                <option value="WST">WST - Samoan Tala - SAT</option>
                <option value="SAR">SAR - Saudi Riyal - ﷼</option>
                <option value="RSD">RSD - Serbian Dinar - din</option>
                <option value="SCR">SCR - Seychellois Rupee - SRe</option>
                <option value="SLL">SLL - Sierra Leonean Leone - Le</option>
                <option value="SGD">SGD - Singapore Dollar - $</option>
                <option value="SKK">SKK - Slovak Koruna - Sk</option>
                <option value="SBD">SBD - Solomon Islands Dollar - Si$</option>
                <option value="SOS">SOS - Somali Shilling - Sh.so.</option>
                <option value="ZAR">ZAR - South African Rand - R</option>
                <option value="KRW">KRW - South Korean Won - ₩</option>
                <option value="XDR">XDR - Special Drawing Rights - SDR</option>
                <option value="LKR">LKR - Sri Lankan Rupee - Rs</option>
                <option value="SHP">SHP - St. Helena Pound - £</option>
                <option value="SDG">SDG - Sudanese Pound - .س.ج</option>
                <option value="SRD">SRD - Surinamese Dollar - $</option>
                <option value="SZL">SZL - Swazi Lilangeni - E</option>
                <option value="SEK">SEK - Swedish Krona - kr</option>
                <option value="CHF">CHF - Swiss Franc - CHf</option>
                <option value="SYP">SYP - Syrian Pound - LS</option>
                <option value="STD">
                  STD - São Tomé and Príncipe Dobra - Db
                </option>
                <option value="TJS">TJS - Tajikistani Somoni - SM</option>
                <option value="TZS">TZS - Tanzanian Shilling - TSh</option>
                <option value="THB">THB - Thai Baht - ฿</option>
                <option value="TOP">TOP - Tongan pa'anga - $</option>
                <option value="TTD">TTD - Trinidad & Tobago Dollar - $</option>
                <option value="TND">TND - Tunisian Dinar - ت.د</option>
                <option value="TRY">TRY - Turkish Lira - ₺</option>
                <option value="TMT">TMT - Turkmenistani Manat - T</option>
                <option value="UGX">UGX - Ugandan Shilling - USh</option>
                <option value="UAH">UAH - Ukrainian Hryvnia - ₴</option>
                <option value="AED">
                  AED - United Arab Emirates Dirham - إ.د
                </option>
                <option value="UYU">UYU - Uruguayan Peso - $</option>
                <option value="USD">USD - US Dollar - $</option>
                <option value="UZS">UZS - Uzbekistan Som - лв</option>
                <option value="VUV">VUV - Vanuatu Vatu - VT</option>
                <option value="VEF">VEF - Venezuelan BolÃ­var - Bs</option>
                <option value="VND">VND - Vietnamese Dong - ₫</option>
                <option value="YER">YER - Yemeni Rial - ﷼</option>
                <option value="ZMK">ZMK - Zambian Kwacha - ZK</option>
              </Form.Select>
            </Form.Control>
          </Form.Field>
          <Icon align="center" onClick={reverse} style={{cursor:'pointer'}}>
            <svg
              height="33"
              width="29"
              viewBox="0 0 29 33"
              xmlns="http://www.w3.org/2000/svg"
              fill="#485fc7"
            >
              <defs />
              <path
                className="cls-1"
                id="Arrows"
                d="M360.679,1632.96a1.479,1.479,0,0,0,1.323-.39l5.467-6.33a1.54,1.54,0,0,0,.041-2.15,1.471,1.471,0,0,0-2.11-.05l-3.415,3.81v-22.36a1.506,1.506,0,0,0-1.518-1.49c-0.839,0-1.467,1.19-1.467,2.02v22.06l-3.4-4.23a1.479,1.479,0,0,0-2.109-.08,1.537,1.537,0,0,0-.48,1.12,1.522,1.522,0,0,0,.4,1.03l5.97,6.59A1.477,1.477,0,0,0,360.679,1632.96Zm13.612-32.92a1.488,1.488,0,0,0-1.328.39l-5.493,6.36a1.537,1.537,0,0,0-.041,2.15,1.48,1.48,0,0,0,2.118.05l3.432-3.82v22.43a1.525,1.525,0,0,0,3.049,0v-22.66l3.365,4.24a1.488,1.488,0,0,0,2.117.08,1.532,1.532,0,0,0,.482-1.12,1.562,1.562,0,0,0-.4-1.04l-5.993-6.61A1.487,1.487,0,0,0,374.291,1600.04Z"
                transform="translate(-353 -1600)"
              />
            </svg>
          </Icon>

          <Form.Field mt="5">

          <Form.Control>
              <Form.Select
                value={currencyB}
                onChange={(e) => setCurrencyB(e.target.value)}
                style={{
                  border: '0'
                }}
              >
                <option value="AFN">AFN - Afghan Afghani - ؋</option>
                <option value="ALL">ALL - Albanian Lek - Lek</option>
                <option value="DZD">DZD - Algerian Dinar - دج</option>
                <option value="AOA">AOA - Angolan Kwanza - Kz</option>
                <option value="ARS">ARS - Argentine Peso - $</option>
                <option value="AMD">AMD - Armenian Dram - ֏</option>
                <option value="AWG">AWG - Aruban Florin - ƒ</option>
                <option value="AUD">AUD - Australian Dollar - $</option>
                <option value="AZN">AZN - Azerbaijani Manat - m</option>
                <option value="BSD">BSD - Bahamian Dollar - B$</option>
                <option value="BHD">BHD - Bahraini Dinar - .د.ب</option>
                <option value="BDT">BDT - Bangladeshi Taka - ৳</option>
                <option value="BBD">BBD - Barbadian Dollar - Bds$</option>
                <option value="BYR">BYR - Belarusian Ruble - Br</option>
                <option value="BEF">BEF - Belgian Franc - fr</option>
                <option value="BZD">BZD - Belize Dollar - $</option>
                <option value="BMD">BMD - Bermudan Dollar - $</option>
                <option value="BTN">BTN - Bhutanese Ngultrum - Nu.</option>
                <option value="BTC">BTC - Bitcoin - ฿</option>
                <option value="BOB">BOB - Bolivian Boliviano - Bs.</option>
                <option value="BAM">
                  BAM - Bosnia-Herzegovina Convertible Mark - KM
                </option>
                <option value="BWP">BWP - Botswanan Pula - P</option>
                <option value="BRL">BRL - Brazilian Real - R$</option>
                <option value="GBP">GBP - British Pound Sterling - £</option>
                <option value="BND">BND - Brunei Dollar - B$</option>
                <option value="BGN">BGN - Bulgarian Lev - Лв.</option>
                <option value="BIF">BIF - Burundian Franc - FBu</option>
                <option value="KHR">KHR - Cambodian Riel - KHR</option>
                <option value="CAD">CAD - Canadian Dollar - $</option>
                <option value="CVE">CVE - Cape Verdean Escudo - $</option>
                <option value="KYD">KYD - Cayman Islands Dollar - $</option>
                <option value="XOF">XOF - CFA Franc BCEAO - CFA</option>
                <option value="XAF">XAF - CFA Franc BEAC - FCFA</option>
                <option value="XPF">XPF - CFP Franc - ₣</option>
                <option value="CLP">CLP - Chilean Peso - $</option>
                <option value="CNY">CNY - Chinese Yuan - ¥</option>
                <option value="COP">COP - Colombian Peso - $</option>
                <option value="KMF">KMF - Comorian Franc - CF</option>
                <option value="CDF">CDF - Congolese Franc - FC</option>
                <option value="CRC">CRC - Costa Rican ColÃ³n - ₡</option>
                <option value="HRK">HRK - Croatian Kuna - kn</option>
                <option value="CUC">
                  CUC - Cuban Convertible Peso - $, CUC
                </option>
                <option value="CZK">CZK - Czech Republic Koruna - Kč</option>
                <option value="DKK">DKK - Danish Krone - Kr.</option>
                <option value="DJF">DJF - Djiboutian Franc - Fdj</option>
                <option value="DOP">DOP - Dominican Peso - $</option>
                <option value="XCD">XCD - East Caribbean Dollar - $</option>
                <option value="EGP">EGP - Egyptian Pound - ج.م</option>
                <option value="ERN">ERN - Eritrean Nakfa - Nfk</option>
                <option value="EEK">EEK - Estonian Kroon - kr</option>
                <option value="ETB">ETB - Ethiopian Birr - Nkf</option>
                <option value="EUR">EUR - Euro - €</option>
                <option value="FKP">FKP - Falkland Islands Pound - £</option>
                <option value="FJD">FJD - Fijian Dollar - FJ$</option>
                <option value="GMD">GMD - Gambian Dalasi - D</option>
                <option value="GEL">GEL - Georgian Lari - ლ</option>
                <option value="DEM">DEM - German Mark - DM</option>
                <option value="GHS">GHS - Ghanaian Cedi - GH₵</option>
                <option value="GIP">GIP - Gibraltar Pound - £</option>
                <option value="GRD">GRD - Greek Drachma - ₯, Δρχ, Δρ</option>
                <option value="GTQ">GTQ - Guatemalan Quetzal - Q</option>
                <option value="GNF">GNF - Guinean Franc - FG</option>
                <option value="GYD">GYD - Guyanaese Dollar - $</option>
                <option value="HTG">HTG - Haitian Gourde - G</option>
                <option value="HNL">HNL - Honduran Lempira - L</option>
                <option value="HKD">HKD - Hong Kong Dollar - $</option>
                <option value="HUF">HUF - Hungarian Forint - Ft</option>
                <option value="ISK">ISK - Icelandic KrÃ³na - kr</option>
                <option value="INR">INR - Indian Rupee - ₹</option>
                <option value="IDR">IDR - Indonesian Rupiah - Rp</option>
                <option value="IRR">IRR - Iranian Rial - ﷼</option>
                <option value="IQD">IQD - Iraqi Dinar - د.ع</option>
                <option value="ILS">ILS - Israeli New Sheqel - ₪</option>
                <option value="ITL">ITL - Italian Lira - L,£</option>
                <option value="JMD">JMD - Jamaican Dollar - J$</option>
                <option value="JPY">JPY - Japanese Yen - ¥</option>
                <option value="JOD">JOD - Jordanian Dinar - ا.د</option>
                <option value="KZT">KZT - Kazakhstani Tenge - лв</option>
                <option value="KES">KES - Kenyan Shilling - KSh</option>
                <option value="KWD">KWD - Kuwaiti Dinar - ك.د</option>
                <option value="KGS">KGS - Kyrgystani Som - лв</option>
                <option value="LAK">LAK - Laotian Kip - ₭</option>
                <option value="LVL">LVL - Latvian Lats - Ls</option>
                <option value="LBP">LBP - Lebanese Pound - £</option>
                <option value="LSL">LSL - Lesotho Loti - L</option>
                <option value="LRD">LRD - Liberian Dollar - $</option>
                <option value="LYD">LYD - Libyan Dinar - د.ل</option>
                <option value="LTL">LTL - Lithuanian Litas - Lt</option>
                <option value="MOP">MOP - Macanese Pataca - $</option>
                <option value="MKD">MKD - Macedonian Denar - ден</option>
                <option value="MGA">MGA - Malagasy Ariary - Ar</option>
                <option value="MWK">MWK - Malawian Kwacha - MK</option>
                <option value="MYR">MYR - Malaysian Ringgit - RM</option>
                <option value="MVR">MVR - Maldivian Rufiyaa - Rf</option>
                <option value="MRO">MRO - Mauritanian Ouguiya - MRU</option>
                <option value="MUR">MUR - Mauritian Rupee - ₨</option>
                <option value="MXN">MXN - Mexican Peso - $</option>
                <option value="MDL">MDL - Moldovan Leu - L</option>
                <option value="MNT">MNT - Mongolian Tugrik - ₮</option>
                <option value="MAD">MAD - Moroccan Dirham - MAD</option>
                <option value="MZM">MZM - Mozambican Metical - MT</option>
                <option value="MMK">MMK - Myanmar Kyat - K</option>
                <option value="NAD">NAD - Namibian Dollar - $</option>
                <option value="NPR">NPR - Nepalese Rupee - ₨</option>
                <option value="ANG">
                  ANG - Netherlands Antillean Guilder - ƒ
                </option>
                <option value="TWD">TWD - New Taiwan Dollar - $</option>
                <option value="NZD">NZD - New Zealand Dollar - $</option>
                <option value="NIO">NIO - Nicaraguan CÃ³rdoba - C$</option>
                <option value="NGN">NGN - Nigerian Naira - ₦</option>
                <option value="KPW">KPW - North Korean Won - ₩</option>
                <option value="NOK">NOK - Norwegian Krone - kr</option>
                <option value="OMR">OMR - Omani Rial - .ع.ر</option>
                <option value="PKR">PKR - Pakistani Rupee - ₨</option>
                <option value="PAB">PAB - Panamanian Balboa - B/.</option>
                <option value="PGK">PGK - Papua New Guinean Kina - K</option>
                <option value="PYG">PYG - Paraguayan Guarani - ₲</option>
                <option value="PEN">PEN - Peruvian Nuevo Sol - S/.</option>
                <option value="PHP">PHP - Philippine Peso - ₱</option>
                <option value="PLN">PLN - Polish Zloty - zł</option>
                <option value="QAR">QAR - Qatari Rial - ق.ر</option>
                <option value="RON">RON - Romanian Leu - lei</option>
                <option value="RUB">RUB - Russian Ruble - ₽</option>
                <option value="RWF">RWF - Rwandan Franc - FRw</option>
                <option value="SVC">SVC - Salvadoran ColÃ³n - ₡</option>
                <option value="WST">WST - Samoan Tala - SAT</option>
                <option value="SAR">SAR - Saudi Riyal - ﷼</option>
                <option value="RSD">RSD - Serbian Dinar - din</option>
                <option value="SCR">SCR - Seychellois Rupee - SRe</option>
                <option value="SLL">SLL - Sierra Leonean Leone - Le</option>
                <option value="SGD">SGD - Singapore Dollar - $</option>
                <option value="SKK">SKK - Slovak Koruna - Sk</option>
                <option value="SBD">SBD - Solomon Islands Dollar - Si$</option>
                <option value="SOS">SOS - Somali Shilling - Sh.so.</option>
                <option value="ZAR">ZAR - South African Rand - R</option>
                <option value="KRW">KRW - South Korean Won - ₩</option>
                <option value="XDR">XDR - Special Drawing Rights - SDR</option>
                <option value="LKR">LKR - Sri Lankan Rupee - Rs</option>
                <option value="SHP">SHP - St. Helena Pound - £</option>
                <option value="SDG">SDG - Sudanese Pound - .س.ج</option>
                <option value="SRD">SRD - Surinamese Dollar - $</option>
                <option value="SZL">SZL - Swazi Lilangeni - E</option>
                <option value="SEK">SEK - Swedish Krona - kr</option>
                <option value="CHF">CHF - Swiss Franc - CHf</option>
                <option value="SYP">SYP - Syrian Pound - LS</option>
                <option value="STD">
                  STD - São Tomé and Príncipe Dobra - Db
                </option>
                <option value="TJS">TJS - Tajikistani Somoni - SM</option>
                <option value="TZS">TZS - Tanzanian Shilling - TSh</option>
                <option value="THB">THB - Thai Baht - ฿</option>
                <option value="TOP">TOP - Tongan pa'anga - $</option>
                <option value="TTD">TTD - Trinidad & Tobago Dollar - $</option>
                <option value="TND">TND - Tunisian Dinar - ت.د</option>
                <option value="TRY">TRY - Turkish Lira - ₺</option>
                <option value="TMT">TMT - Turkmenistani Manat - T</option>
                <option value="UGX">UGX - Ugandan Shilling - USh</option>
                <option value="UAH">UAH - Ukrainian Hryvnia - ₴</option>
                <option value="AED">
                  AED - United Arab Emirates Dirham - إ.د
                </option>
                <option value="UYU">UYU - Uruguayan Peso - $</option>
                <option value="USD">USD - US Dollar - $</option>
                <option value="UZS">UZS - Uzbekistan Som - лв</option>
                <option value="VUV">VUV - Vanuatu Vatu - VT</option>
                <option value="VEF">VEF - Venezuelan BolÃ­var - Bs</option>
                <option value="VND">VND - Vietnamese Dong - ₫</option>
                <option value="YER">YER - Yemeni Rial - ﷼</option>
                <option value="ZMK">ZMK - Zambian Kwacha - ZK</option>
              </Form.Select>
            </Form.Control>

            <Form.Control fullwidth>
              <Form.Input textAlign="right" placeholder="0.00" value={inputB} onChange={onChangeB} />
            </Form.Control>
            
          </Form.Field>
        </form>
      </Box>
    </Container>
  );
}

export default App;
