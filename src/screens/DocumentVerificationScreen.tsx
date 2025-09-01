import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Colors } from '../utils/colors';

const { width } = Dimensions.get('window');

interface DocumentVerificationScreenProps {
  emailOrPhone: string;
  type: 'email' | 'phone';
  onComplete: () => void;
  onGoBack: () => void;
}

const DocumentVerificationScreen: React.FC<DocumentVerificationScreenProps> = ({
  emailOrPhone,
  type,
  onComplete,
  onGoBack,
}) => {
  const [documentImage, setDocumentImage] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTakeDocumentPhoto = () => {
    Alert.alert(
      'Document Photo',
      'This would open the camera to take a photo of your ID document. For demo purposes, we\'ll simulate this.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Take Photo',
          onPress: () => {
            // Simulate taking a photo
            setDocumentImage('document_placeholder');
          },
        },
      ]
    );
  };

  const handleTakeSelfie = () => {
    Alert.alert(
      'Selfie Verification',
      'This would open the camera to take a selfie for identity verification. For demo purposes, we\'ll simulate this.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Take Selfie',
          onPress: () => {
            // Simulate taking a selfie
            setSelfieImage('selfie_placeholder');
          },
        },
      ]
    );
  };

  const handleComplete = async () => {
    if (!documentImage || !selfieImage) {
      Alert.alert('Error', 'Please upload both your document and selfie to continue');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      onComplete();
    } catch (error) {
      Alert.alert('Error', 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderImagePlaceholder = (type: 'document' | 'selfie') => {
    const hasImage = type === 'document' ? documentImage : selfieImage;
    
    if (hasImage) {
      return (
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>
              {type === 'document' ? '📄' : '📷'}
            </Text>
            <Text style={styles.imagePlaceholderLabel}>
              {type === 'document' ? 'Document Uploaded' : 'Selfie Taken'}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.uploadContainer}>
        <View style={styles.uploadIcon}>
          <Text style={styles.uploadIconText}>
            {type === 'document' ? '📄' : '📷'}
          </Text>
        </View>
        <Text style={styles.uploadText}>
          {type === 'document' ? 'Upload Document' : 'Take Selfie'}
        </Text>
        <Text style={styles.uploadSubtext}>
          {type === 'document' 
            ? 'Take a clear photo of your ID document'
            : 'Take a selfie for identity verification'
          }
        </Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Identity Verification</Text>
        <Text style={styles.subtitle}>
          To complete your registration, we need to verify your identity with a document and selfie
        </Text>
      </View>

      <View style={styles.verificationContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Document Verification</Text>
          <Text style={styles.sectionDescription}>
            Take a clear photo of your government-issued ID (passport, driver's license, or national ID)
          </Text>
          
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleTakeDocumentPhoto}
          >
            {renderImagePlaceholder('document')}
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Selfie Verification</Text>
          <Text style={styles.sectionDescription}>
            Take a selfie to verify your identity matches the document
          </Text>
          
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleTakeSelfie}
          >
            {renderImagePlaceholder('selfie')}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Why do we need this?</Text>
        <Text style={styles.infoText}>
          • Comply with financial regulations{'\n'}
          • Prevent fraud and identity theft{'\n'}
          • Ensure account security{'\n'}
          • Enable full app functionality
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.completeButton,
          (!documentImage || !selfieImage || isLoading) && styles.completeButtonDisabled,
        ]}
        onPress={handleComplete}
        disabled={!documentImage || !selfieImage || isLoading}
      >
        <Text style={styles.completeButtonText}>
          {isLoading ? 'Verifying...' : 'Complete Verification'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  verificationContainer: {
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  uploadButton: {
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  uploadContainer: {
    alignItems: 'center',
  },
  uploadIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadIconText: {
    fontSize: 24,
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 120,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  imagePlaceholderText: {
    fontSize: 24,
    marginBottom: 4,
  },
  imagePlaceholderLabel: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: Colors.background,
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  completeButton: {
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
  completeButtonDisabled: {
    opacity: 0.6,
  },
  completeButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DocumentVerificationScreen;

