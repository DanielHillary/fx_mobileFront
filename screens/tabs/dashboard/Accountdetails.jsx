import { View, Text, TouchableOpacity  } from 'react-native'
import { COLORS, SIZES } from '../../../constants'

import styles from './accountdetails.style'



const AccountDetails = ({ account, dataArrived }) => {

    const accountDetails = account;
    return (
        <View style={styles.accountcontainer}>
            <Text style={styles.text}>Welcome, {accountDetails.userName} </Text>
            {/* <Text style={styles.text}>Welcome, Danny</Text> */}
            <TouchableOpacity>
              <Text style={{
                color: COLORS.lightWhite, 
                alignSelf: 'flex-start',
                marginTop: 4,
                fontSize: SIZES.small,
                }}>
                    Account Balance: ID {accountDetails.login}
                    {/* Account Balance: ID 30472121 */}
                </Text>
            </TouchableOpacity>
            <View style={{flexDirection: "row", height: 55}}>
                <Text style={styles.balance}>${accountDetails.formattedBalance}</Text>
                {/* <Text style={styles.balance}>$11,097</Text> */}
                <Text style={styles.smallbalance}>.{accountDetails.fraction}</Text>
                {/* <Text style={styles.smallbalance}>.46</Text> */}
            </View>
        </View>
    )
}

export default AccountDetails;