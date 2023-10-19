import { View, Text, TouchableOpacity  } from 'react-native'
import { COLORS, SIZES } from '../../constants'

import styles from './accountdetails.style'


const AccountDetails = () => {
    const accountDetails = "324555651"
    return (
        <View style={styles.accountcontainer}>
            <Text style={styles.text}>Hello Daniel,</Text>
            <TouchableOpacity>
            <View style={styles.container}>
              <Text style={{
                color: COLORS.lightWhite, 
                alignSelf: 'center',
                marginTop: 4,
                }}>
                    Account Balance: ID {accountDetails}
                </Text>
            </View>
            </TouchableOpacity>
            <View style={{flexDirection: "row", height: 65}}>
                <Text style={styles.balance}>$50,456</Text>
                <Text style={styles.smallbalance}>.27</Text>
            </View>
        </View>
    )
}

export default AccountDetails;