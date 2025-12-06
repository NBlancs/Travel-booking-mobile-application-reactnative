import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Modal, TextInput, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { settingsStorage } from "../../lib/api";
import { useTheme } from "../../context/ThemeContext";

interface PaymentMethod {
  id: number;
  type: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
}

interface BillingAddress {
  street: string;
  city: string;
  country: string;
}

const PAYMENT_METHODS_KEY = "payment_methods";
const BILLING_ADDRESS_KEY = "billing_address";

const defaultPaymentMethods: PaymentMethod[] = [
  { id: 1, type: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
  { id: 2, type: "Mastercard", last4: "8888", expiry: "09/26", isDefault: false },
];

const defaultBillingAddress: BillingAddress = {
  street: "123 Travel Street",
  city: "Adventure City, AC 12345",
  country: "United States",
};

export default function PaymentMethodsScreen() {
  const { colors } = useTheme();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [billingAddress, setBillingAddress] = useState<BillingAddress>(defaultBillingAddress);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  
  // New card form state
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardType, setCardType] = useState("Visa");
  const [isSaving, setIsSaving] = useState(false);

  // Load saved payment data
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedMethods = await settingsStorage.get<PaymentMethod[]>(PAYMENT_METHODS_KEY, defaultPaymentMethods);
        const savedAddress = await settingsStorage.get<BillingAddress>(BILLING_ADDRESS_KEY, defaultBillingAddress);
        setPaymentMethods(savedMethods);
        setBillingAddress(savedAddress);
      } catch (error) {
        console.log("Error loading payment data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Save payment methods
  const savePaymentMethods = async (methods: PaymentMethod[]) => {
    await settingsStorage.set(PAYMENT_METHODS_KEY, methods);
    setPaymentMethods(methods);
  };

  // Add new card
  const handleAddCard = async () => {
    if (cardNumber.length < 4 || !expiryDate) {
      Alert.alert("Error", "Please enter valid card details");
      return;
    }
    
    setIsSaving(true);
    try {
      const newCard: PaymentMethod = {
        id: Date.now(),
        type: cardType,
        last4: cardNumber.slice(-4),
        expiry: expiryDate,
        isDefault: paymentMethods.length === 0,
      };
      
      await savePaymentMethods([...paymentMethods, newCard]);
      setShowAddModal(false);
      setCardNumber("");
      setExpiryDate("");
      Alert.alert("Success", "Card added successfully!");
    } catch (error) {
      Alert.alert("Error", "Failed to add card");
    } finally {
      setIsSaving(false);
    }
  };

  // Set default card
  const handleSetDefault = async (cardId: number) => {
    const updated = paymentMethods.map((m) => ({
      ...m,
      isDefault: m.id === cardId,
    }));
    await savePaymentMethods(updated);
  };

  // Delete card
  const handleDeleteCard = (cardId: number) => {
    Alert.alert(
      "Delete Card",
      "Are you sure you want to remove this card?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updated = paymentMethods.filter((m) => m.id !== cardId);
            // If deleting default, make first remaining card default
            if (updated.length > 0 && !updated.some((m) => m.isDefault)) {
              updated[0].isDefault = true;
            }
            await savePaymentMethods(updated);
          },
        },
      ]
    );
  };

  // Save billing address
  const handleSaveAddress = async () => {
    await settingsStorage.set(BILLING_ADDRESS_KEY, billingAddress);
    setShowEditAddressModal(false);
    Alert.alert("Success", "Billing address updated!");
  };

  // Show options for a card
  const showCardOptions = (card: PaymentMethod) => {
    const buttons: any[] = [
      { text: "Cancel", style: "cancel" },
    ];
    
    if (!card.isDefault) {
      buttons.push({
        text: "Set as Default",
        onPress: () => handleSetDefault(card.id),
      });
    }
    
    buttons.push({ 
      text: "Delete", 
      style: "destructive", 
      onPress: () => handleDeleteCard(card.id) 
    });
    
    Alert.alert(
      `${card.type} •••• ${card.last4}`,
      "Choose an action",
      buttons
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Payment Methods</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Payment Cards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Saved Cards</Text>
          {paymentMethods.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: colors.surface }]}>
              <Ionicons name="card-outline" size={48} color={colors.textSecondary} />
              <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>No saved cards</Text>
            </View>
          ) : (
            paymentMethods.map((method) => (
              <View key={method.id} style={[styles.cardItem, { backgroundColor: colors.surface }]}>
                <View style={styles.cardIcon}>
                  <Ionicons name="card" size={24} color={colors.primary} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardType, { color: colors.text }]}>{method.type} •••• {method.last4}</Text>
                  <Text style={[styles.cardExpiry, { color: colors.textSecondary }]}>Expires {method.expiry}</Text>
                </View>
                {method.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
                <Pressable style={styles.moreButton} onPress={() => showCardOptions(method)}>
                  <Ionicons name="ellipsis-vertical" size={20} color={colors.textSecondary} />
                </Pressable>
              </View>
            ))
          )}
        </View>

        {/* Add New Card Button */}
        <Pressable 
          style={[styles.addButton, { backgroundColor: colors.surface, borderColor: colors.border }]} 
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
          <Text style={styles.addButtonText}>Add New Card</Text>
        </Pressable>

        {/* Billing Address */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Billing Address</Text>
          <View style={[styles.addressCard, { backgroundColor: colors.surface }]}>
            <Text style={[styles.addressText, { color: colors.textSecondary }]}>{billingAddress.street}</Text>
            <Text style={[styles.addressText, { color: colors.textSecondary }]}>{billingAddress.city}</Text>
            <Text style={[styles.addressText, { color: colors.textSecondary }]}>{billingAddress.country}</Text>
            <Pressable style={styles.editLink} onPress={() => setShowEditAddressModal(true)}>
              <Text style={styles.editLinkText}>Edit Address</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Add Card Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Add New Card</Text>
              <Pressable onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </Pressable>
            </View>
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Card Type</Text>
            <View style={styles.cardTypeRow}>
              {["Visa", "Mastercard", "Amex"].map((type) => (
                <Pressable
                  key={type}
                  style={[
                    styles.cardTypeButton, 
                    { borderColor: colors.border },
                    cardType === type && styles.cardTypeButtonActive
                  ]}
                  onPress={() => setCardType(type)}
                >
                  <Text style={[
                    styles.cardTypeText, 
                    { color: colors.text },
                    cardType === type && styles.cardTypeTextActive
                  ]}>
                    {type}
                  </Text>
                </Pressable>
              ))}
            </View>
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Card Number</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={colors.textSecondary}
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="number-pad"
              maxLength={16}
            />
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Expiry Date</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              placeholder="MM/YY"
              placeholderTextColor={colors.textSecondary}
              value={expiryDate}
              onChangeText={setExpiryDate}
              maxLength={5}
            />
            
            <Pressable 
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]} 
              onPress={handleAddCard}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.saveButtonText}>Add Card</Text>
              )}
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Edit Address Modal */}
      <Modal visible={showEditAddressModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Edit Billing Address</Text>
              <Pressable onPress={() => setShowEditAddressModal(false)}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </Pressable>
            </View>
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Street Address</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              value={billingAddress.street}
              onChangeText={(text) => setBillingAddress({ ...billingAddress, street: text })}
            />
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>City, State, ZIP</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              value={billingAddress.city}
              onChangeText={(text) => setBillingAddress({ ...billingAddress, city: text })}
            />
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Country</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background, color: colors.text, borderColor: colors.border }]}
              value={billingAddress.country}
              onChangeText={(text) => setBillingAddress({ ...billingAddress, country: text })}
            />
            
            <Pressable style={styles.saveButton} onPress={handleSaveAddress}>
              <Text style={styles.saveButtonText}>Save Address</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 32,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardType: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 14,
    color: "#6B7280",
  },
  defaultBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  defaultText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2563EB",
  },
  moreButton: {
    padding: 4,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563EB",
    marginLeft: 8,
  },
  addressCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
  },
  addressText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  editLink: {
    marginTop: 12,
  },
  editLinkText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#1F2937",
    backgroundColor: "#FFFFFF",
  },
  cardTypeRow: {
    flexDirection: "row",
    gap: 8,
  },
  cardTypeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  cardTypeButtonActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  cardTypeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  cardTypeTextActive: {
    color: "#FFFFFF",
  },
  saveButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  bottomSpacing: {
    height: 40,
  },
});
