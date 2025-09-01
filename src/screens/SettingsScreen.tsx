import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import { Colors } from '../utils/colors';
import { mockAPI, User } from '../services/mockData';

interface SettingsScreenProps {
  onLogout?: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onLogout }) => {
  const [user, setUser] = useState<User | null>(null);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await mockAPI.getUser();
      setUser(userData);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los datos del usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = () => {
    Alert.alert('Cambiar Contraseña', 'Función de cambio de contraseña (mock)');
  };

  const handlePrivacyTerms = () => {
    Alert.alert('Privacidad y Términos', 'Abriendo página de privacidad y términos...');
  };

  const handleHelpSupport = () => {
    Alert.alert('Ayuda y Soporte', 'Abriendo página de ayuda y soporte...');
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: () => {
            if (onLogout) {
              onLogout();
            } else {
              Alert.alert('Sesión Cerrada', 'Has cerrado sesión correctamente');
            }
          }
        }
      ]
    );
  };

  const getKYCStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return Colors.success;
      case 'pending': return Colors.warning;
      case 'rejected': return Colors.error;
      default: return Colors.textSecondary;
    }
  };

  const getKYCStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Aprobado';
      case 'pending': return 'Pendiente';
      case 'rejected': return 'Rechazado';
      default: return 'Desconocido';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configuración</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perfil</Text>
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'Usuario'}</Text>
            <Text style={styles.profileEmail}>{user?.emailOrPhone || 'email@example.com'}</Text>
          </View>
          <View style={styles.kycBadge}>
            <Text style={[
              styles.kycText,
              { color: getKYCStatusColor(user?.kycStatus || 'pending') }
            ]}>
              KYC: {getKYCStatusText(user?.kycStatus || 'pending')}
            </Text>
          </View>
        </View>
      </View>

      {/* Security Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Seguridad</Text>
        <View style={styles.settingsList}>
          <TouchableOpacity style={styles.settingItem} onPress={handleChangePassword}>
            <Text style={styles.settingText}>Cambiar Contraseña</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Biometría</Text>
            <Switch
              value={biometricsEnabled}
              onValueChange={setBiometricsEnabled}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={biometricsEnabled ? Colors.white : Colors.textLight}
            />
          </View>
        </View>
      </View>

      {/* Privacy & Terms Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacidad y Términos</Text>
        <View style={styles.settingsList}>
          <TouchableOpacity style={styles.settingItem} onPress={handlePrivacyTerms}>
            <Text style={styles.settingText}>Política de Privacidad</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={handlePrivacyTerms}>
            <Text style={styles.settingText}>Términos de Servicio</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Help & Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ayuda y Soporte</Text>
        <View style={styles.settingsList}>
          <TouchableOpacity style={styles.settingItem} onPress={handleHelpSupport}>
            <Text style={styles.settingText}>Preguntas Frecuentes</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={handleHelpSupport}>
            <Text style={styles.settingText}>Contactar Soporte</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  profileCard: {
    marginHorizontal: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  kycBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.background,
  },
  kycText: {
    fontSize: 12,
    fontWeight: '600',
  },
  settingsList: {
    marginHorizontal: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingText: {
    fontSize: 16,
    color: Colors.text,
  },
  settingArrow: {
    fontSize: 18,
    color: Colors.textSecondary,
  },
  logoutSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: Colors.error,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
