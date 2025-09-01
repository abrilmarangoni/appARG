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
    switch (type) {
      case 'cashback': return '🎁';
      case 'p2p_sent': return '📤';
      case 'p2p_received': return '📥';
      case 'qr_pay': return '📱';
      case 'yield': return '📈';
      default: return '💰';
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
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      {/* Wallet Card */}
      <View style={styles.walletCard}>
        <Text style={styles.balanceLabel}>Balance</Text>
        <Text style={styles.balanceAmount}>
          ${wallet?.available.toFixed(2) || '0.00'}
        </Text>
        <Text style={styles.balanceSubtext}>Disponible</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleScanQR}>
          <Text style={styles.actionIcon}>📱</Text>
          <Text style={styles.actionText}>Escanear QR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleSend}>
          <Text style={styles.actionIcon}>📤</Text>
          <Text style={styles.actionText}>Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleReceive}>
          <Text style={styles.actionIcon}>📥</Text>
          <Text style={styles.actionText}>Recibir</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleTopUp}>
          <Text style={styles.actionIcon}>💳</Text>
          <Text style={styles.actionText}>Recargar</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Actividad Reciente</Text>
        
        {activity.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No hay actividad reciente</Text>
            <Text style={styles.emptySubtext}>
              Tus transacciones aparecerán aquí
            </Text>
          </View>
        ) : (
          <View style={styles.activityList}>
            {activity.slice(0, 5).map((item) => (
              <View key={item.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Text style={styles.activityEmoji}>
                    {getActivityIcon(item.type)}
                  </Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>
                    {getActivityTitle(item)}
                  </Text>
                  <Text style={styles.activityNote}>{item.note}</Text>
                  <Text style={styles.activityDate}>
                    {formatDate(item.date)}
                  </Text>
                </View>
                <Text style={[
                  styles.activityAmount,
                  { color: item.amount >= 0 ? Colors.success : Colors.text }
                ]}>
                  {formatAmount(item.amount)}
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  walletCard: {
    marginHorizontal: 24,
    marginBottom: 30,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  actionButton: {
    alignItems: 'center',
    minWidth: 60,
    minHeight: 60,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  activitySection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textLight,
  },
  activityList: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    fontSize: 18,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  activityNote: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
