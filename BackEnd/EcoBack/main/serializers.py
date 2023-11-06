from rest_framework import serializers
from .models import *

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'
    
    image = serializers.ImageField(use_url=True)

class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = '__all__'
    image = serializers.ImageField(use_url=True)

class BarcodeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Barcode
        fields = '__all__'

    image = serializers.ImageField(use_url=True, required=True)

class BadgeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Badge
        fields = '__all__'

    image = serializers.ImageField(use_url=True, required=True)


class ProductCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Badge
        fields = '__all__'

    image = serializers.ImageField(use_url=True, required=True)
