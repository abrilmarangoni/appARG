import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../utils/colors';
import { mockAPI, ActivityItem, Wallet } from '../services/mockData';



interface HomeScreenProps {
  onNavigateToScan?: () => void;
  onNavigateToSend?: () => void;
  onNavigateToReceive?: () => void;
  onNavigateToTopUp?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateToScan,
  onNavigateToSend,
  onNavigateToReceive,
  onNavigateToTopUp,
}) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [walletData, activityData] = await Promise.all([
        mockAPI.getWallet(),
        mockAPI.getActivity(),
      ]);
      setWallet(walletData);
      setActivity(activityData);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los datos');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleScanQR = () => {
    if (onNavigateToScan) {
      onNavigateToScan();
    } else {
      Alert.alert('QR Scanner', 'Función de escaneo QR (mock)');
    }
  };

  const handleSend = () => {
    if (onNavigateToSend) {
      onNavigateToSend();
    } else {
      Alert.alert('Enviar', 'Función de envío (mock)');
    }
  };

  const handleReceive = () => {
    if (onNavigateToReceive) {
      onNavigateToReceive();
    } else {
      Alert.alert('Recibir', 'Función de recibir (mock)');
    }
  };

  const handleTopUp = () => {
    if (onNavigateToTopUp) {
      onNavigateToTopUp();
    } else {
      Alert.alert('Recargar', 'Función de recarga (placeholder)');
    }
  };

  const getActivityIcon = (type: string) => {
    const iconStyle = {
      width: 8,
      height: 8,
      borderRadius: 4,
    };
    
    switch (type) {
      case 'cashback': 
        return <View style={[iconStyle, { backgroundColor: Colors.success }]} />;
      case 'p2p_sent': 
        return <View style={[iconStyle, { backgroundColor: Colors.error }]} />;
      case 'p2p_received': 
        return <View style={[iconStyle, { backgroundColor: Colors.success }]} />;
      case 'qr_pay': 
        return <View style={[iconStyle, { backgroundColor: Colors.primary }]} />;
      case 'yield': 
        return <View style={[iconStyle, { backgroundColor: Colors.secondary }]} />;
      default: 
        return <View style={[iconStyle, { backgroundColor: Colors.textLight }]} />;
    }
  };

  const getActivityTitle = (item: ActivityItem) => {
    switch (item.type) {
      case 'cashback': return `Cashback • ${item.merchantName || 'Tienda'}`;
      case 'p2p_sent': return 'Pago enviado';
      case 'p2p_received': return 'Pago recibido';
      case 'qr_pay': return `QR Pay • ${item.merchantName || 'Comercio'}`;
      case 'yield': return 'Rendimiento mensual';
      default: return 'Transacción';
    }
  };

  const formatAmount = (amount: number) => {
    const sign = amount >= 0 ? '+' : '';
    return `${sign}$${Math.abs(amount).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola, Juan!</Text>
          <Text style={styles.subGreeting}>¿Cómo estás hoy?</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.rewardButton}>
            <Text style={styles.rewardText}>Reward</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationButton}>
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Wallet Card */}
      <LinearGradient
        colors={['#E91E63', '#C2185B']}
        style={styles.walletCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.walletContent}>
          <Text style={styles.balanceAmount}>
            ${wallet?.available.toFixed(2) || '0.00'}
          </Text>
          <Text style={styles.balanceSubtext}>+3.50% desde el mes pasado</Text>
          
          <View style={styles.walletFooter}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardNumber}>Número **** 1214</Text>
              <Text style={styles.cardExpiry}>Exp 02/15</Text>
            </View>
            <TouchableOpacity style={styles.addMoneyButton}>
              <Text style={styles.addMoneyText}>Add money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSend}>
          <View style={[styles.actionIcon, styles.sendIcon]}>
            <View style={styles.sendIconInner}>
              <View style={[styles.sendArrow, { borderBottomColor: Colors.white }]} />
              <View style={[styles.sendDots, { backgroundColor: Colors.white }]} />
            </View>
          </View>
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleReceive}>
          <View style={[styles.actionIcon, styles.receiveIcon]}>
            <View style={styles.receiveIconInner}>
              <View style={[styles.receiveArrow, { borderTopColor: Colors.white }]} />
              <View style={[styles.receiveDots, { backgroundColor: Colors.white }]} />
            </View>
          </View>
          <Text style={styles.actionText}>Receive</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleTopUp}>
          <View style={[styles.actionIcon, styles.withdrawIcon]}>
            <View style={styles.withdrawIconInner}>
              <View style={[styles.withdrawBox, { borderColor: Colors.white }]} />
              <View style={[styles.withdrawArrow, { borderTopColor: Colors.white }]} />
            </View>
          </View>
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleScanQR}>
          <View style={[styles.actionIcon, styles.moreIcon]}>
            <View style={styles.moreIconInner}>
              <View style={[styles.moreCircle, { borderColor: Colors.white }]} />
              <View style={[styles.moreDots, { backgroundColor: Colors.white }]} />
            </View>
          </View>
          <Text style={styles.actionText}>More</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {activity.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No hay actividad reciente</Text>
            <Text style={styles.emptySubtext}>
              Tus transacciones aparecerán aquí
            </Text>
          </View>
        ) : (
          <View style={styles.activityList}>
            {activity.slice(0, 4).map((item) => (
              <View key={item.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  {getActivityIcon(item.type)}
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityAmount}>
                    {formatAmount(item.amount)}
                  </Text>
                  <Text style={styles.activityDate}>
                    {formatDate(item.date)}
                  </Text>
                </View>
                <Text style={styles.activityTitle}>
                  {item.type === 'p2p_sent' ? 'Send' : 
                   item.type === 'p2p_received' ? 'Deposit' :
                   item.type === 'qr_pay' ? 'Payment' : 'Deposit'}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardButton: {
    backgroundColor: Colors.success,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  rewardText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  walletCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 20,
    padding: 24,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  walletContent: {
    flex: 1,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 8,
    letterSpacing: -1,
  },
  balanceSubtext: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 24,
  },
  walletFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardInfo: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.7,
  },
  addMoneyButton: {
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  addMoneyText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 16,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  sendIcon: {
    backgroundColor: Colors.primary,
  },
  receiveIcon: {
    backgroundColor: Colors.success,
  },
  withdrawIcon: {
    backgroundColor: Colors.warning,
  },
  moreIcon: {
    backgroundColor: Colors.secondary,
  },
  sendIconInner: {
    alignItems: 'center',
  },
  sendArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginBottom: 2,
  },
  sendDots: {
    width: 12,
    height: 2,
    borderRadius: 1,
  },
  receiveIconInner: {
    alignItems: 'center',
  },
  receiveArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginBottom: 2,
  },
  receiveDots: {
    width: 12,
    height: 2,
    borderRadius: 1,
  },
  withdrawIconInner: {
    alignItems: 'center',
  },
  withdrawBox: {
    width: 12,
    height: 8,
    borderWidth: 2,
    borderRadius: 2,
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  withdrawArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  moreIconInner: {
    alignItems: 'center',
  },
  moreCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  moreDots: {
    width: 8,
    height: 2,
    borderRadius: 1,
  },
  actionText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  activitySection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textLight,
  },
  activityList: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  activityDate: {
    fontSize: 12,
    color: Colors.textLight,
    fontWeight: '500',
    marginBottom: 2,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
});

export default HomeScreen;
