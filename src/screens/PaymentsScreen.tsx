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

// Minimalist icons for payment actions
const ScanIcon = ({ color }: { color: string }) => (
  <View style={[styles.iconContainer, { borderColor: color }]}>
    <View style={[styles.iconInner, { backgroundColor: color }]} />
  </View>
);

const QRCodeIcon = ({ color }: { color: string }) => (
  <View style={[styles.iconContainer, { borderColor: color }]}>
    <View style={styles.qrGrid}>
      <View style={[styles.qrDot, { backgroundColor: color }]} />
      <View style={[styles.qrDot, { backgroundColor: color }]} />
      <View style={[styles.qrDot, { backgroundColor: color }]} />
      <View style={[styles.qrDot, { backgroundColor: color }]} />
    </View>
  </View>
);

const SendIcon = ({ color }: { color: string }) => (
  <View style={[styles.iconContainer, { borderColor: color }]}>
    <View style={[styles.arrowIcon, { borderTopColor: color, borderRightColor: color }]} />
  </View>
);

const RequestIcon = ({ color }: { color: string }) => (
  <View style={[styles.iconContainer, { borderColor: color }]}>
    <View style={[styles.arrowIcon, { borderBottomColor: color, borderLeftColor: color }]} />
  </View>
);

const SplitIcon = ({ color }: { color: string }) => (
  <View style={[styles.iconContainer, { borderColor: color }]}>
    <View style={styles.splitIcon}>
      <View style={[styles.splitLine, { backgroundColor: color }]} />
      <View style={[styles.splitLine, { backgroundColor: color }]} />
      <View style={[styles.splitLine, { backgroundColor: color }]} />
    </View>
  </View>
);

const PaymentsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'qr' | 'p2p' | 'split'>('qr');

  const handleScanQR = () => {
    Alert.alert('QR Scanner', 'Abriendo cámara para escanear QR...');
  };

  const handleShowMyQR = () => {
    Alert.alert('Mi QR', 'Mostrando tu código QR para recibir pagos');
  };

  const handleSendMoney = () => {
    Alert.alert('Enviar Dinero', 'Seleccionando contacto...');
  };

  const handleRequestMoney = () => {
    Alert.alert('Solicitar Dinero', 'Seleccionando contacto...');
  };

  const handleCreateSplit = () => {
    Alert.alert('Crear División', 'Configurando división de gastos...');
  };

  const renderQRTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pagar con QR</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleScanQR}>
          <ScanIcon color={Colors.white} />
          <Text style={styles.primaryButtonText}>Escanear QR</Text>
        </TouchableOpacity>
        <Text style={styles.sectionDescription}>
          Escanea el código QR del comercio para pagar
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recibir Pagos</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleShowMyQR}>
          <QRCodeIcon color={Colors.primary} />
          <Text style={styles.secondaryButtonText}>Mostrar Mi QR</Text>
        </TouchableOpacity>
        <Text style={styles.sectionDescription}>
          Muestra tu código QR para que otros te paguen
        </Text>
      </View>
    </ScrollView>
  );

  const renderP2PTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Enviar Dinero</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSendMoney}>
          <Text style={styles.primaryButtonText}>📤 Enviar Dinero</Text>
        </TouchableOpacity>
        <Text style={styles.sectionDescription}>
          Envía dinero a tus contactos
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Solicitar Dinero</Text>
        <TouchableOpacity style={styles.secondaryButton} onPress={handleRequestMoney}>
          <Text style={styles.secondaryButtonText}>📥 Solicitar Dinero</Text>
        </TouchableOpacity>
        <Text style={styles.sectionDescription}>
          Solicita dinero a tus contactos
        </Text>
      </View>
    </ScrollView>
  );

  const renderSplitTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dividir Gastos</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={handleCreateSplit}>
          <Text style={styles.primaryButtonText}>🧾 Crear División</Text>
        </TouchableOpacity>
        <Text style={styles.sectionDescription}>
          Divide gastos entre amigos
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tipos de División</Text>
        <View style={styles.splitOptions}>
          <View style={styles.splitOption}>
            <Text style={styles.splitOptionTitle}>División Igual</Text>
            <Text style={styles.splitOptionDescription}>
              Divide el total entre todos por igual
            </Text>
          </View>
          <View style={styles.splitOption}>
            <Text style={styles.splitOptionTitle}>Montos Personalizados</Text>
            <Text style={styles.splitOptionDescription}>
              Define montos específicos para cada persona
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pagos</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'qr' && styles.activeTab]}
          onPress={() => setActiveTab('qr')}
        >
          <Text style={[styles.tabText, activeTab === 'qr' && styles.activeTabText]}>
            QR Pay
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'p2p' && styles.activeTab]}
          onPress={() => setActiveTab('p2p')}
        >
          <Text style={[styles.tabText, activeTab === 'p2p' && styles.activeTabText]}>
            P2P
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'split' && styles.activeTab]}
          onPress={() => setActiveTab('split')}
        >
          <Text style={[styles.tabText, activeTab === 'split' && styles.activeTabText]}>
            Dividir
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'qr' && renderQRTab()}
      {activeTab === 'p2p' && renderP2PTab()}
      {activeTab === 'split' && renderSplitTab()}
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
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
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
  tabContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
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
  primaryButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  splitOptions: {
    marginTop: 16,
  },
  splitOption: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  splitOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  splitOptionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default PaymentsScreen;
