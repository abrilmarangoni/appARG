import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Colors } from '../utils/colors';

// Minimalist icons with fine lines
const SendIcon = ({ color }: { color: string }) => (
  <View style={styles.iconContainer}>
    <View style={[styles.iconInner, { backgroundColor: color }]}>
      <View style={styles.arrowLine} />
    </View>
  </View>
);

const RequestIcon = ({ color }: { color: string }) => (
  <View style={styles.iconContainer}>
    <View style={[styles.iconInner, { backgroundColor: color }]}>
      <View style={[styles.arrowLine, { transform: [{ rotate: '180deg' }] }]} />
    </View>
  </View>
);

const HistoryIcon = ({ color }: { color: string }) => (
  <View style={styles.iconContainer}>
    <View style={[styles.iconInner, { backgroundColor: color }]}>
      <View style={styles.historyLines}>
        <View style={[styles.historyLine, { backgroundColor: color }]} />
        <View style={[styles.historyLine, { backgroundColor: color }]} />
        <View style={[styles.historyLine, { backgroundColor: color }]} />
      </View>
    </View>
  </View>
);

const PaymentsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'p2p' | 'history'>('p2p');

  const handleSendMoney = () => {
    Alert.alert('Enviar Dinero', 'Función de envío de dinero');
  };

  const handleRequestMoney = () => {
    Alert.alert('Solicitar Dinero', 'Función de solicitud de dinero');
  };

  const renderP2PTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Transferencias P2P</Text>
      <Text style={styles.sectionSubtitle}>
        Envía o solicita dinero a otros usuarios
      </Text>

      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionCard} onPress={handleSendMoney}>
          <SendIcon color={Colors.primary} />
          <Text style={styles.actionTitle}>Enviar Dinero</Text>
          <Text style={styles.actionDescription}>
            Transfiere dinero a otro usuario
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={handleRequestMoney}>
          <RequestIcon color={Colors.success} />
          <Text style={styles.actionTitle}>Solicitar Dinero</Text>
          <Text style={styles.actionDescription}>
            Pide dinero a otro usuario
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Transferencias Recientes</Text>
        <View style={styles.recentList}>
          {[
            { name: 'María García', amount: '$50.00 USD', type: 'sent', date: 'Hoy' },
            { name: 'Juan Pérez', amount: '$25.00 USD', type: 'received', date: 'Ayer' },
            { name: 'Ana López', amount: '$100.00 USD', type: 'sent', date: '2 días' },
          ].map((transaction, index) => (
            <View key={index} style={styles.recentItem}>
              <View style={styles.recentIcon}>
                <View style={[
                  styles.recentIconInner,
                  { backgroundColor: transaction.type === 'sent' ? Colors.primary : Colors.success }
                ]} />
              </View>
              <View style={styles.recentInfo}>
                <Text style={styles.recentName}>{transaction.name}</Text>
                <Text style={styles.recentDate}>{transaction.date}</Text>
              </View>
              <Text style={[
                styles.recentAmount,
                { color: transaction.type === 'sent' ? Colors.error : Colors.success }
              ]}>
                {transaction.type === 'sent' ? '-' : '+'}{transaction.amount}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderHistoryTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Historial de Pagos</Text>
      <Text style={styles.sectionSubtitle}>
        Todas tus transacciones y pagos
      </Text>

      <View style={styles.historyList}>
        {[
          { 
            title: 'Transferencia a María García', 
            amount: '$50.00 USD', 
            type: 'sent', 
            date: '15 Dic 2024',
            status: 'Completado'
          },
          { 
            title: 'Recibo de Juan Pérez', 
            amount: '$25.00 USD', 
            type: 'received', 
            date: '14 Dic 2024',
            status: 'Completado'
          },
          { 
            title: 'Pago de servicios', 
            amount: '$30.00 USD', 
            type: 'payment', 
            date: '13 Dic 2024',
            status: 'Completado'
          },
          { 
            title: 'Transferencia a Ana López', 
            amount: '$100.00 USD', 
            type: 'sent', 
            date: '12 Dic 2024',
            status: 'Completado'
          },
        ].map((transaction, index) => (
          <View key={index} style={styles.historyItem}>
            <View style={styles.historyIcon}>
              <View style={[
                styles.historyIconInner,
                { backgroundColor: transaction.type === 'sent' ? Colors.primary : 
                                 transaction.type === 'received' ? Colors.success : Colors.warning }
              ]} />
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>{transaction.title}</Text>
              <Text style={styles.historyDate}>{transaction.date}</Text>
              <Text style={styles.historyStatus}>{transaction.status}</Text>
            </View>
            <Text style={[
              styles.historyAmount,
              { color: transaction.type === 'sent' ? Colors.error : Colors.success }
            ]}>
              {transaction.type === 'sent' ? '-' : '+'}{transaction.amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pagos</Text>
        <Text style={styles.headerSubtitle}>Gestiona tus transferencias</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'p2p' && styles.activeTab]}
          onPress={() => setActiveTab('p2p')}
        >
          <Text style={[styles.tabText, activeTab === 'p2p' && styles.activeTabText]}>
            P2P
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            Historial
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'p2p' ? renderP2PTab() : renderHistoryTab()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: Colors.backgroundCard,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundCard,
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.white,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLine: {
    width: 12,
    height: 2,
    backgroundColor: Colors.white,
    borderRadius: 1,
  },
  historyLines: {
    width: 16,
    height: 12,
    justifyContent: 'space-between',
  },
  historyLine: {
    height: 1.5,
    borderRadius: 0.75,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  recentSection: {
    marginBottom: 32,
  },
  recentList: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  recentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recentIconInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  recentInfo: {
    flex: 1,
  },
  recentName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  recentDate: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  recentAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  historyList: {
    backgroundColor: Colors.backgroundCard,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyIconInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  historyStatus: {
    fontSize: 11,
    color: Colors.success,
    fontWeight: '500',
  },
  historyAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default PaymentsScreen;