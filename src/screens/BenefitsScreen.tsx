import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Colors } from '../utils/colors';
import { mockAPI, CashbackData, GrowthData, ActivityItem } from '../services/mockData';

const { width } = Dimensions.get('window');

const BenefitsScreen: React.FC = () => {
  const [cashback, setCashback] = useState<CashbackData | null>(null);
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [cashbackData, growthDataResult, activityData] = await Promise.all([
        mockAPI.getCashback(),
        mockAPI.getGrowthData(),
        mockAPI.getActivity(),
      ]);
      setCashback(cashbackData);
      setGrowthData(growthDataResult);
      setActivity(activityData.filter(item => 
        item.type === 'cashback' || item.type === 'yield'
      ));
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  const renderGrowthChart = () => {
    if (growthData.length === 0) return null;

    const maxBalance = Math.max(...growthData.map(d => d.balance));
    const minBalance = Math.min(...growthData.map(d => d.balance));
    const range = maxBalance - minBalance;
    const chartWidth = width - 80;
    const chartHeight = 200;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Crecimiento de Balance</Text>
        <Text style={styles.chartSubtitle}>
          Depositaste $200 hace 4 meses → ahora $250
        </Text>
        
        <View style={styles.chart}>
          <View style={styles.chartArea}>
            {growthData.map((point, index) => {
              const x = (index / (growthData.length - 1)) * chartWidth;
              const y = chartHeight - ((point.balance - minBalance) / range) * chartHeight;
              
              return (
                <View
                  key={index}
                  style={[
                    styles.chartPoint,
                    {
                      left: x - 4,
                      top: y - 4,
                    }
                  ]}
                />
              );
            })}
            
            {/* Simple line connecting points */}
            {growthData.map((point, index) => {
              if (index === growthData.length - 1) return null;
              const nextPoint = growthData[index + 1];
              const x1 = (index / (growthData.length - 1)) * chartWidth;
              const y1 = chartHeight - ((point.balance - minBalance) / range) * chartHeight;
              const x2 = ((index + 1) / (growthData.length - 1)) * chartWidth;
              const y2 = chartHeight - ((nextPoint.balance - minBalance) / range) * chartHeight;
              
              return (
                <View
                  key={`line-${index}`}
                  style={[
                    styles.chartLine,
                    {
                      left: x1,
                      top: y1,
                      width: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
                      transform: [{
                        rotate: `${Math.atan2(y2 - y1, x2 - x1)}rad`
                      }]
                    }
                  ]}
                />
              );
            })}
          </View>
          
          {/* Y-axis labels */}
          <View style={styles.yAxis}>
            <Text style={styles.axisLabel}>${maxBalance}</Text>
            <Text style={styles.axisLabel}>${Math.round((maxBalance + minBalance) / 2)}</Text>
            <Text style={styles.axisLabel}>${minBalance}</Text>
          </View>
          
          {/* X-axis labels */}
          <View style={styles.xAxis}>
            {growthData.map((point, index) => (
              <Text key={index} style={styles.axisLabel}>
                {point.month}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'cashback': return '🎁';
      case 'yield': return '📈';
      default: return '💰';
    }
  };

  const getActivityTitle = (item: ActivityItem) => {
    switch (item.type) {
      case 'cashback': return `Cashback • +$${item.amount.toFixed(2)}`;
      case 'yield': return `Rendimiento • +$${item.amount.toFixed(2)}`;
      default: return 'Beneficio';
    }
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
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Beneficios</Text>
      </View>

      {/* Cashback Card */}
      <View style={styles.cashbackCard}>
        <Text style={styles.cashbackTitle}>Total Cashback</Text>
        <Text style={styles.cashbackTotal}>
          ${cashback?.total.toFixed(2) || '0.00'}
        </Text>
        <Text style={styles.cashbackSubtitle}>Acumulado</Text>
        
        <View style={styles.cashbackDivider} />
        
        <Text style={styles.cashbackMonth}>
          Este mes: ${cashback?.thisMonth.toFixed(2) || '0.00'}
        </Text>
      </View>

      {/* Growth Chart */}
      {renderGrowthChart()}

      {/* Activity List */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Actividad de Beneficios</Text>
        
        {activity.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No hay actividad de beneficios</Text>
            <Text style={styles.emptySubtext}>
              Tus cashbacks y rendimientos aparecerán aquí
            </Text>
          </View>
        ) : (
          <View style={styles.activityList}>
            {activity.map((item) => (
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
                <Text style={styles.activityAmount}>
                  +${item.amount.toFixed(2)}
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
  cashbackCard: {
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
  cashbackTitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  cashbackTotal: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  cashbackSubtitle: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
    marginBottom: 16,
  },
  cashbackDivider: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.white,
    opacity: 0.3,
    marginBottom: 16,
  },
  cashbackMonth: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '600',
  },
  chartContainer: {
    marginHorizontal: 24,
    marginBottom: 30,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  chart: {
    height: 200,
    position: 'relative',
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  chartPoint: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  chartLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: Colors.primary,
    opacity: 0.6,
  },
  yAxis: {
    position: 'absolute',
    left: -40,
    top: 0,
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  axisLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
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
    color: Colors.success,
  },
});

export default BenefitsScreen;
