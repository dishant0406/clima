import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Home = () => {
  const [locationData, setLocationData] = useState<any>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  let openWeatherStringWithLatandLong = 'https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid=7b26c92417fd3678d52eac12dc870222'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=0bb1314f31c8ea');
        const data = await response.json();
        setLocationData(data);
        openWeatherStringWithLatandLong = openWeatherStringWithLatandLong.replace('{latitude}', data.loc.split(',')[0]).replace('{longitude}', data.loc.split(',')[1])
        console.log(openWeatherStringWithLatandLong)
        const weatherResponse = await fetch(openWeatherStringWithLatandLong.replace('{latitude}', data.loc.split(',')[0]).replace('{longitude}', data.loc.split(',')[1]));
        const weatherData = await weatherResponse.json();
        console.log(weatherData)
        setWeatherData(weatherData);

      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchData();
  }, []);

  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else if (hour < 22) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  }




  return (
    <LinearGradient
      colors={['#c1802b', '#2f3255', '#010101']}
      className='h-full w-full px-[5vw]'
    >
      <SafeAreaView className='h-full w-full'>
        <View className='flex justify-between flex-row items-center'>
          <View>
            <View className='flex flex-row gap-2 justify-start items-center'>
              <Text className='text-[2vh] text-white ml-[1vh]' style={styles.fontRegular}>{
                locationData?.region
              }</Text>
              <Icon className='' name='arrow-top-right' size={20} color='white' />
            </View>
            <Text className='text-[3vh] text-white mt-[0.5vh]' style={styles.fontRegular}>
              {
                getGreeting()
              }
            </Text>
          </View>
          <View className='border p-2 rounded-full border-white'>

            <Icon className='' name='dots-vertical' size={30} color='white' />
          </View>
        </View>
        <View className='flex justify-center items-center mt-[2vh]'>
          <Image
            source={require('../../assets/img/cloudy.png')}

            style={{ width: 300, height: 200, resizeMode: 'contain' }}
          />
        </View>
        <View className='flex justify-center items-center'>
          <Text style={styles.fontRegular} className='text-[10vh] pt-10 text-white'>
            {(Number(weatherData?.main?.temp) - 273).toFixed(0)}°C
          </Text>
          <Text style={styles.fontRegular} className='text-[3vh] text-white'>
            {
              weatherData?.weather[0].main.toUpperCase()
            }
          </Text>
          <Text style={styles.fontRegular} className='text-[2vh] mt-2 text-white'>
            <Text style={styles.fontLight}>{
              //get week day
              new Date().toLocaleString('en-us', { weekday: 'long' })

            }
              <Text> </Text>
              {
                //get date
                new Date().toLocaleString('en-us', { day: 'numeric' })
              }

            </Text>
            <Text> | </Text>
            <Text style={styles.fontLight}>

              {
                //get time
                new Date().toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true })
              }
            </Text>
          </Text>
        </View>

        <View className='flex flex-row justify-center pt-10 gap-4 items-center w-full'>
          <Text className='text-[2.5vh] text-[#c2802b]' style={styles.fontRegular}>Next Days</Text>
          <Icon className='' name='arrow-right-circle' size={30} color='#fff' />
        </View>

        <View className='flex flex-row border-b border-white/20 justify-between items-center pb-4 mt-4'>
          <View className='flex flex-row items-center gap-2'>
            <Image source={require('../../assets/img/sun.png')} style={{ width: 30, height: 30 }} />
            <View className='flex flex-col'>
              <Text style={styles.fontLight} className='text-white text-[1.8vh]'>Sunrise</Text>
              <Text style={styles.fontRegular} className='text-white text-[2vh]'>
                {
                  //get time
                  new Date(weatherData?.sys?.sunrise! * 1000).toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true })
                }

              </Text>
            </View>
          </View>
          <View className='flex flex-row items-center gap-2'>
            <Image source={require('../../assets/img/night.png')} style={{ width: 30, height: 30 }} />
            <View className='flex flex-col'>
              <Text style={styles.fontLight} className='text-white text-[1.8vh]'>Sunset</Text>
              <Text style={styles.fontRegular} className='text-white text-[2vh]'>
                {
                  //get time
                  new Date(weatherData?.sys?.sunset! * 1000).toLocaleString('en-us', { hour: 'numeric', minute: 'numeric', hour12: true })
                }

              </Text>
            </View>
          </View>
        </View>
        <View className='flex flex-row border-b border-white/20 justify-between items-center pb-4 mt-4'>
          <View className='flex flex-row items-center gap-2'>
            <View className='flex flex-col'>
              <Text style={styles.fontLight} className='text-white text-[1.8vh]'>Air Quality</Text>
              <Text style={styles.fontRegular} className='text-white mt-2 text-[2vh]'>
                60 Moderate
              </Text>
            </View>
          </View>
          <View className='flex flex-row items-center gap-2'>

            <View className='flex flex-col'>
              <Text style={styles.fontLight} className='text-white text-[1.8vh]'>Humidity</Text>
              <Text style={styles.fontRegular} className='text-white mt-2 text-[2vh]'>
                54%

              </Text>
            </View>
          </View>
        </View>
        <View className='flex flex-row border-b border-white/20 justify-between items-center pb-4 mt-4'>
          <View className='flex flex-row items-center gap-2'>
            <View className='flex flex-col'>
              <Text style={styles.fontLight} className='text-white text-[1.8vh]'>Wind</Text>
              <Text style={styles.fontRegular} className='text-white mt-2 text-[2vh]'>
                4 km/h

              </Text>
            </View>
          </View>
          <View className='flex flex-row items-center gap-2'>

            <View className='flex flex-col'>
              <Text style={styles.fontLight} className='text-white text-[1.8vh]'>Pressure</Text>
              <Text style={styles.fontRegular} className='text-white mt-2 text-[2vh]'>
                1012 mb

              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  fontBold: {
    fontFamily: 'Duera PERSONAL USE Expanded Medium'
  },
  fontRegular: {
    fontFamily: 'Duera PERSONAL USE Expanded Light',
  },
  fontLight: {
    fontFamily: 'Duera PERSONAL USE Expanded Thin'
  },
  fontThin: {
    fontFamily: 'Duera PERSONAL USE Expanded Thin'
  },
});

export default Home