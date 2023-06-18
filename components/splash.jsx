import { StyleSheet, Image, View, Dimensions } from 'react-native'
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { useEffect, useState } from 'react'

export default function Splash() {
  const [fill, setFill] = useState({ ascending: true, current: 0 })
  useEffect(() => {
    const id = setInterval(() => {
      
      setFill(fill => {
        if(fill.ascending) {
          if(fill.current === 100) {
            return { ascending: false, current: 95 }
          } else {
            return { ascending: true, current: fill.current + 5 }
          }
        } else {
          if(fill.current === 0) {
            return { ascending: true, current: 5 }
          } else {
            return { ascending: false, current: fill.current - 5 }
          }
        }
      })
    }, 300)
    return () => {
      clearInterval(id)
    }
  }, [])
  const win = Dimensions.get('window')
  const widthRatio = 5 / 4
  const logoWidth = win.width / widthRatio
  const logoHeight = win.width / (2059 * widthRatio) * 448

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
    },
    verticalFiller: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    gradient: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    },
    horizontalCenter: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1
    },
    logo: {
      width: logoWidth,
      height: logoHeight
    }
  })
  
  return (
    <View style={styles.verticalFiller}>
      <View style={styles.container}>
        <Svg height="100%" width="100%" style={ StyleSheet.absoluteFillObject }>
          <Defs>
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
              fx="50%"
              fy="50%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor="#fff" stopOpacity="1" />
              <Stop offset="1" stopColor="#f67f21" stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
        </Svg>
        <View style={styles.horizontalCenter}>
          <Image source={require('../assets/dealbee.png')} style={styles.logo}/>
          <AnimatedCircularProgress size={logoWidth / 2} zIndex="1" fill={fill.current} width={15} tintColor="#00e0ff"
            backgroundColor="#3d5875" duration={300} padding={10}/>
        </View>
      </View>
    </View>
  )
}