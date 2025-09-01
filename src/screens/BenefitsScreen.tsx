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
    const chartWidth = width - 60;
    const chartHeight = 180;

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Plazo Fijo</Text>
          <View style={styles.chartBadge}>
            <Text style={styles.chartBadgeText}>+{((maxBalance - minBalance) / minBalance * 100).toFixed(1)}%</Text>
          </View>
        </View>
        <Text style={styles.chartSubtitle}>
          Depositaste $200 USD hace 4 meses → ahora $250 USD
        </Text>
        
        <View style={styles.chart}>
          <View style={styles.chartArea}>
            {/* Area fill */}
            <View style={styles.chartAreaFill}>
              {growthData.map((point, index) => {
                if (index === growthData.length - 1) return null;
                const x1 = (index / (growthData.length - 1)) * chartWidth;
                const y1 = chartHeight - ((point.balance - minBalance) / range) * chartHeight;
                const x2 = ((index + 1) / (growthData.length - 1)) * chartWidth;
                const y2 = chartHeight - ((growthData[index + 1].balance - minBalance) / range) * chartHeight;
                
                return (
                  <View
                    key={`area-${index}`}
                    style={[
                      styles.areaSegment,
                      {
                        left: x1,
                        top: Math.min(y1, y2),
                        width: x2 - x1,
                        height: Math.abs(y2 - y1) + (chartHeight - Math.max(y1, y2)),
                      }
                    ]}
                  />
                );
              })}
            </View>
            
            {/* Line connecting points */}
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
            
            {/* Data points */}
            {growthData.map((point, index) => {
              const x = (index / (growthData.length - 1)) * chartWidth;
              const y = chartHeight - ((point.balance - minBalance) / range) * chartHeight;
              
              return (
                <View
                  key={index}
                  style={[
                    styles.chartPoint,
                    {
                      left: x - 6,
                      top: y - 6,
                    }
                  ]}
                />
              );
            })}
          </View>
          
          {/* Y-axis labels */}
          <View style={styles.yAxis}>
            <Text style={styles.axisLabel}>${maxBalance} USD</Text>
            <Text style={styles.axisLabel}>${Math.round((maxBalance + minBalance) / 2)} USD</Text>
            <Text style={styles.axisLabel}>${minBalance} USD</Text>
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
        
        <View style={styles.chartInfo}>
          <View style={styles.chartInfoItem}>
            <Text style={styles.chartInfoLabel}>Inversión inicial</Text>
            <Text style={styles.chartInfoValue}>$200 USD</Text>
          </View>
          <View style={styles.chartInfoItem}>
            <Text style={styles.chartInfoLabel}>Ganancia total</Text>
            <Text style={styles.chartInfoValue}>+$50 USD</Text>
          </View>
          <View style={styles.chartInfoItem}>
            <Text style={styles.chartInfoLabel}>Rendimiento anual</Text>
            <Text style={styles.chartInfoValue}>+25%</Text>
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
    backgroundColor: Colors.backgroundCard,
    borderRadius: 20,
    padding: 24,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  chartBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chartBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  chartSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  chart: {
    height: 180,
    position: 'relative',
    marginBottom: 20,
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  chartAreaFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  areaSegment: {
    position: 'absolute',
    backgroundColor: Colors.primary + '20',
  },
  chartPoint: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    borderWidth: 3,
    borderColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  chartLine: {
    position: 'absolute',
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 1.5,
  },
  yAxis: {
    position: 'absolute',
    left: -50,
    top: 0,
    height: 180,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 20,
  },
  axisLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  chartInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  chartInfoItem: {
    alignItems: 'center',
    flex: 1,
  },
  chartInfoLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },
  chartInfoValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '700',
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
